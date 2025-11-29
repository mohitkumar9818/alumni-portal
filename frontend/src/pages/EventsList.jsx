import { useState, useEffect } from 'react'
import { getEvents, registerForEvent } from '../services/api'
import Card from '../components/Card'

const EventsList = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = async () => {
        try {
            const response = await getEvents()
            setEvents(response.data)
            setError('') // Clear any previous errors
        } catch (err) {
            console.error('Error loading events:', err)
            if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
                setError('Cannot connect to server. Make sure the backend is running (start-backend.bat)')
            } else if (err.response?.status === 401) {
                setError('Session expired. Please log in again.')
            } else {
                setError(err.response?.data?.error || 'Failed to load events. Check if backend is running.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (eventId) => {
        try {
            await registerForEvent(eventId)
            setSuccess('Successfully registered for event!')
            loadEvents()
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to register')
        }
    }

    return (
        <div className="events-page">
            <div className="container">
                <h1>Upcoming Events</h1>

                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-error">{error}</div>}
                {loading && <div className="loading">Loading events...</div>}

                <div className="cards-grid">
                    {events.map((event) => (
                        <Card key={event._id}>
                            <h3>{event.title}</h3>
                            <p className="description">{event.description}</p>
                            <p className="date">
                                {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                            </p>
                            {event.location && <p className="location">{event.location}</p>}
                            <p className="capacity">
                                {event.attendees?.length || 0} / {event.capacity} attendees
                            </p>
                            {event.ticketPrice > 0 && (
                                <p className="price">${event.ticketPrice}</p>
                            )}
                            <button
                                onClick={() => handleRegister(event._id)}
                                className="btn btn-primary"
                                disabled={event.attendees?.length >= event.capacity}
                            >
                                {event.attendees?.length >= event.capacity ? 'Full' : 'Register'}
                            </button>
                        </Card>
                    ))}
                </div>

                {!loading && events.length === 0 && (
                    <p>No upcoming events.</p>
                )}
            </div>
        </div>
    )
}

export default EventsList
