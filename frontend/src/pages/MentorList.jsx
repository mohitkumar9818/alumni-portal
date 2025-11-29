import { useState, useEffect } from 'react'
import { searchDirectory } from '../services/api'
import Card from '../components/Card'

const MentorList = () => {
    const [mentors, setMentors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        loadMentors()
    }, [])

    const loadMentors = async () => {
        try {
            const response = await searchDirectory({})
            const mentorUsers = response.data.users.filter(u => u.optInMentor)
            setMentors(mentorUsers)
            setError('') // Clear any previous errors
        } catch (err) {
            console.error('Error loading mentors:', err)
            if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
                setError('Cannot connect to server. Make sure the backend is running (start-backend.bat)')
            } else if (err.response?.status === 401) {
                setError('Session expired. Please log in again.')
            } else {
                setError(err.response?.data?.error || 'Failed to load mentors. Check if backend is running.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mentors-page">
            <div className="container">
                <h1>Available Mentors</h1>

                {loading && <div className="loading">Loading mentors...</div>}
                {error && <div className="alert alert-error">{error}</div>}

                <div className="cards-grid">
                    {mentors.map((mentor) => (
                        <Card key={mentor._id}>
                            <h3>{mentor.name}</h3>
                            {mentor.company && <p className="company">{mentor.company}</p>}
                            {mentor.gradYear && <p className="grad-year">Class of {mentor.gradYear}</p>}
                            {mentor.bio && <p className="bio">{mentor.bio}</p>}
                            {mentor.skills?.length > 0 && (
                                <div className="tags">
                                    {mentor.skills.map((skill, i) => (
                                        <span key={i} className="tag">{skill}</span>
                                    ))}
                                </div>
                            )}
                            {mentor.linkedIn && (
                                <a href={mentor.linkedIn} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                                    LinkedIn
                                </a>
                            )}
                        </Card>
                    ))}
                </div>

                {!loading && mentors.length === 0 && (
                    <p>No mentors available yet.</p>
                )}
            </div>
        </div>
    )
}

export default MentorList
