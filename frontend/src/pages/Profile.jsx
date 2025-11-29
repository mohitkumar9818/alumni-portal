import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateMe } from '../services/api'
import FormInput from '../components/FormInput'
import Card from '../components/Card'

const Profile = () => {
    const { user, refreshUser } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        gradYear: '',
        company: '',
        industry: '',
        location: '',
        skills: '',
        interests: '',
        bio: '',
        linkedIn: '',
        phone: '',
        optInMentor: false
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                gradYear: user.gradYear || '',
                company: user.company || '',
                industry: user.industry || '',
                location: user.location || '',
                skills: user.skills?.join(', ') || '',
                interests: user.interests?.join(', ') || '',
                bio: user.bio || '',
                linkedIn: user.linkedIn || '',
                phone: user.phone || '',
                optInMentor: user.optInMentor || false
            })
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            await updateMe({
                ...formData,
                gradYear: formData.gradYear ? parseInt(formData.gradYear) : undefined,
                skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
                interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean)
            })
            setSuccess('Profile updated successfully!')
            await refreshUser()
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="profile-page">
            <div className="container">
                <Card>
                    <h1>My Profile</h1>
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <FormInput
                            label="Graduation Year"
                            type="number"
                            value={formData.gradYear}
                            onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                        />
                        <FormInput
                            label="Company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                        <FormInput
                            label="Industry"
                            type="text"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        />
                        <FormInput
                            label="Location"
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                        <FormInput
                            label="Skills (comma-separated)"
                            type="text"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            placeholder="e.g., Python, Machine Learning, React"
                        />
                        <FormInput
                            label="Interests (comma-separated)"
                            type="text"
                            value={formData.interests}
                            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                            placeholder="e.g., AI, Startups, Education"
                        />
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                className="form-input"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows="4"
                                maxLength="500"
                            />
                        </div>
                        <FormInput
                            label="LinkedIn URL"
                            type="url"
                            value={formData.linkedIn}
                            onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        />
                        <FormInput
                            label="Phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.optInMentor}
                                    onChange={(e) => setFormData({ ...formData, optInMentor: e.target.checked })}
                                />
                                I want to be a mentor
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Profile
