import { useState, useEffect } from 'react'
import { getJobs } from '../services/api'
import Card from '../components/Card'

const JobsList = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filters, setFilters] = useState({ type: '', company: '' })

    useEffect(() => {
        loadJobs()
    }, [filters])

    const loadJobs = async () => {
        try {
            const response = await getJobs(filters)
            setJobs(response.data)
            setError('') // Clear any previous errors
        } catch (err) {
            console.error('Error loading jobs:', err)
            if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
                setError('Cannot connect to server. Make sure the backend is running (start-backend.bat)')
            } else if (err.response?.status === 401) {
                setError('Session expired. Please log in again.')
            } else {
                setError(err.response?.data?.error || 'Failed to load jobs. Check if backend is running.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="jobs-page">
            <div className="container">
                <h1>Job Opportunities</h1>

                <div className="filters">
                    <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="form-input"
                    >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                {loading && <div className="loading">Loading jobs...</div>}
                {error && <div className="alert alert-error">{error}</div>}

                <div className="cards-grid">
                    {jobs.map((job) => (
                        <Card key={job._id}>
                            <h3>{job.title}</h3>
                            <p className="company">{job.company}</p>
                            <p className="job-type">{job.type}</p>
                            {job.location && <p className="location">{job.location}</p>}
                            <p className="description">{job.description}</p>
                            {job.tags?.length > 0 && (
                                <div className="tags">
                                    {job.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                Apply Now
                            </a>
                        </Card>
                    ))}
                </div>

                {!loading && jobs.length === 0 && (
                    <p>No jobs available yet.</p>
                )}
            </div>
        </div>
    )
}

export default JobsList
