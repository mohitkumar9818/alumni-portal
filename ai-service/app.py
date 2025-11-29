from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import httpx
from datetime import datetime

app = FastAPI(title="Alumni Portal AI Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Profile(BaseModel):
    skills: List[str] = []
    interests: List[str] = []
    gradYear: Optional[int] = None
    company: Optional[str] = None
    industry: Optional[str] = None

class RecommendationRequest(BaseModel):
    userId: str
    profile: Profile

class MentorRecommendation(BaseModel):
    id: str
    name: str
    company: Optional[str]
    industry: Optional[str]
    shared_skills: List[str]
    shared_interests: List[str]
    score: int
    gradYear: Optional[int]

class JobRecommendation(BaseModel):
    id: str
    title: str
    company: str
    tags: List[str]
    matched_tags: List[str]
    score: int

class RecommendationResponse(BaseModel):
    mentors: List[MentorRecommendation]
    jobs: List[JobRecommendation]
    timestamp: str

# Helper function to calculate mentor score
def calculate_mentor_score(user_profile: Profile, mentor: dict) -> tuple:
    score = 0
    shared_skills = []
    shared_interests = []
    
    # Match skills (+5 per skill)
    mentor_skills = mentor.get('skills', [])
    for skill in user_profile.skills:
        if skill.lower() in [s.lower() for s in mentor_skills]:
            score += 5
            shared_skills.append(skill)
    
    # Match interests (+3 per interest)
    mentor_interests = mentor.get('interests', [])
    for interest in user_profile.interests:
        if interest.lower() in [i.lower() for i in mentor_interests]:
            score += 3
            shared_interests.append(interest)
    
    # Grad year proximity (+2 if within 10 years)
    if user_profile.gradYear and mentor.get('gradYear'):
        year_diff = abs(user_profile.gradYear - mentor['gradYear'])
        if year_diff <= 10:
            score += 2
    
    # Same company (+4)
    if user_profile.company and mentor.get('company'):
        if user_profile.company.lower() == mentor['company'].lower():
            score += 4
    
    # Same industry (+4)
    if user_profile.industry and mentor.get('industry'):
        if user_profile.industry.lower() == mentor['industry'].lower():
            score += 4
    
    return score, shared_skills, shared_interests

# Helper function to calculate job score
def calculate_job_score(user_profile: Profile, job: dict) -> tuple:
    score = 0
    matched_tags = []
    
    job_tags = job.get('tags', [])
    
    # Match skills with job tags (+10 per match)
    for skill in user_profile.skills:
        if skill.lower() in [t.lower() for t in job_tags]:
            score += 10
            matched_tags.append(skill)
    
    # Match interests with job tags (+5 per match)
    for interest in user_profile.interests:
        if interest.lower() in [t.lower() for t in job_tags]:
            score += 5
            if interest not in matched_tags:
                matched_tags.append(interest)
    
    return score, matched_tags

@app.get("/")
async def root():
    return {
        "service": "Alumni Portal AI Service",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """
    Get AI-powered mentor and job recommendations.
    
    MVP Algorithm (rule-based):
    - Mentors: Score based on shared skills, interests, grad year, company, industry
    - Jobs: Score based on matching tags with user skills/interests
    - Returns top 5 mentors and top 5 jobs
    
    Future: Upgrade to embeddings + FAISS for semantic matching
    """
    try:
        backend_url = os.getenv('BACKEND_URL', 'http://localhost:5000')
        
        # Fetch potential mentors (users with optInMentor=true)
        async with httpx.AsyncClient(timeout=10.0) as client:
            # In production, add proper auth token
            try:
                mentors_response = await client.get(
                    f"{backend_url}/api/directory?limit=100"
                )
                all_users = mentors_response.json().get('users', [])
            except Exception as e:
                print(f"Error fetching mentors: {e}")
                all_users = []
            
            # Filter mentors
            potential_mentors = [
                u for u in all_users 
                if u.get('optInMentor') and u.get('_id') != request.userId
            ]
            
            # Score and rank mentors
            mentor_scores = []
            for mentor in potential_mentors:
                score, shared_skills, shared_interests = calculate_mentor_score(
                    request.profile, mentor
                )
                if score > 0:  # Only include mentors with some match
                    mentor_scores.append({
                        'mentor': mentor,
                        'score': score,
                        'shared_skills': shared_skills,
                        'shared_interests': shared_interests
                    })
            
            # Sort by score and take top 5
            mentor_scores.sort(key=lambda x: x['score'], reverse=True)
            top_mentors = mentor_scores[:5]
            
            # Fetch jobs
            try:
                jobs_response = await client.get(f"{backend_url}/api/jobs")
                all_jobs = jobs_response.json() if isinstance(jobs_response.json(), list) else []
            except Exception as e:
                print(f"Error fetching jobs: {e}")
                all_jobs = []
            
            # Score and rank jobs
            job_scores = []
            for job in all_jobs:
                score, matched_tags = calculate_job_score(request.profile, job)
                if score > 0:
                    job_scores.append({
                        'job': job,
                        'score': score,
                        'matched_tags': matched_tags
                    })
            
            # Sort by score and take top 5
            job_scores.sort(key=lambda x: x['score'], reverse=True)
            top_jobs = job_scores[:5]
        
        # Format response
        mentor_recommendations = [
            MentorRecommendation(
                id=str(m['mentor']['_id']),
                name=m['mentor']['name'],
                company=m['mentor'].get('company'),
                industry=m['mentor'].get('industry'),
                shared_skills=m['shared_skills'],
                shared_interests=m['shared_interests'],
                score=m['score'],
                gradYear=m['mentor'].get('gradYear')
            )
            for m in top_mentors
        ]
        
        job_recommendations = [
            JobRecommendation(
                id=str(j['job']['_id']),
                title=j['job']['title'],
                company=j['job']['company'],
                tags=j['job'].get('tags', []),
                matched_tags=j['matched_tags'],
                score=j['score']
            )
            for j in top_jobs
        ]
        
        return RecommendationResponse(
            mentors=mentor_recommendations,
            jobs=job_recommendations,
            timestamp=datetime.utcnow().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
