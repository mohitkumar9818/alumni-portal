import { useState } from 'react'
import { createEvent, createJob } from '../services/api'
import Card from '../components/Card'
import FormInput from '../components/FormInput'

const Admin = () => {
    const [activeTab, setActiveTab] = useState('event')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        capacity: 100,
        ticketPrice: 0
    })

    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        type: 'Full-time',
        tags: '',
        applyUrl: '',
        salary: ''
    })

    const handleCreateEvent = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            await createEvent(eventData)
            setSuccess('Event created successfully!')
            setEventData({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                location: '',
                capacity: 100,
                ticketPrice: 0
            })
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create event')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateJob = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            await createJob({
                ...jobData,
                tags: jobData.tags.split(',').map(t => t.trim()).filter(Boolean)
            })
            setSuccess('Job posted successfully!')
            setJobData({
                title: '',
                company: '',
                description: '',
                location: '',
                type: 'Full-time',
                tags: '',
                applyUrl: '',
                salary: ''
            })
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create job')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-page">
            <div className="container">
                <h1>Admin Panel</h1>

                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'event' ? 'active' : ''}`}
                        onClick={() => setActiveTab('event')}
                    >
                        Create Event
                    </button>
                    <button
                        className={`tab ${activeTab === 'job' ? 'active' : ''}`}
                        onClick={() => setActiveTab('job')}
                    >
                        Post Job
                    </button>
                </div>

                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                {activeTab === 'event' && (
                    <Card>
                        <h2>Create Event</h2>
                        <form onSubmit={handleCreateEvent}>
                            <FormInput
                                label="Title"
                                value={eventData.title}
                                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                                required
                            />
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    className="form-input"
                                    value={eventData.description}
                                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                                    required
                                    rows="4"
                                />
                            </div>
                            <FormInput
                                label="Start Date"
                                type="datetime-local"
                                value={eventData.startDate}
                                onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                                required
                            />
                            <FormInput
                                label="End Date"
                                type="datetime-local"
                                value={eventData.endDate}
                                onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                                required
                            />
                            <FormInput
                                label="Location"
                                value={eventData.location}
                                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                            />
                            <FormInput
                                label="Capacity"
                                type="number"
                                value={eventData.capacity}
                                onChange={(e) => setEventData({ ...eventData, capacity: parseInt(e.target.value) })}
                                required
                            />
                            <FormInput
                                label="Ticket Price ($)"
                                type="number"
                                value={eventData.ticketPrice}
                                onChange={(e) => setEventData({ ...eventData, ticketPrice: parseFloat(e.target.value) })}
                            />
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Event'}
                            </button>
                        </form>
                    </Card>
                )}

                {activeTab === 'job' && (
                    <Card>
                        <h2>Post Job</h2>
                        <form onSubmit={handleCreateJob}>
                            <FormInput
                                label="Job Title"
                                value={jobData.title}
                                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                                required
                            />
                            <FormInput
                                label="Company"
                                value={jobData.company}
                                onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                                required
                            />
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    className="form-input"
                                    value={jobData.description}
                                    onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                                    required
                                    rows="4"
                                />
                            </div>
                            <FormInput
                                label="Location"
                                value={jobData.location}
                                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                            />
                            <div className="form-group">
                                <label>Type</label>
                                <select
                                    className="form-input"
                                    value={jobData.type}
                                    onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <FormInput
                                label="Tags (comma-separated)"
                                value={jobData.tags}
                                onChange={(e) => setJobData({ ...jobData, tags: e.target.value })}
                                placeholder="e.g., Python, ML, Remote"
                            />
                            <FormInput
                                label="Apply URL"
                                type="url"
                                value={jobData.applyUrl}
                                onChange={(e) => setJobData({ ...jobData, applyUrl: e.target.value })}
                                required
                            />
                            <FormInput
                                label="Salary Range"
                                value={jobData.salary}
                                onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                                placeholder="e.g., $80k-$120k"
                            />
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        </form>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default Admin
