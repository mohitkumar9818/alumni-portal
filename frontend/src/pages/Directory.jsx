import { useState, useEffect } from 'react'
import { searchDirectory } from '../services/api'
import Card from '../components/Card'
import FormInput from '../components/FormInput'

const Directory = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filters, setFilters] = useState({
        name: '',
        year: '',
        company: '',
        location: ''
    })

    useEffect(() => {
        loadDirectory()
    }, [])

    const loadDirectory = async () => {
        try {
            const response = await searchDirectory(filters)
            setUsers(response.data.users)
        } catch (err) {
            setError('Failed to load directory')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setLoading(true)
        loadDirectory()
    }

    return (
        <div className="directory-page">
            <div className="container">
                <h1>Alumni Directory</h1>

                <Card className="search-card">
                    <form onSubmit={handleSearch} className="search-form">
                        <FormInput
                            placeholder="Name"
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                        />
                        <FormInput
                            placeholder="Graduation Year"
                            type="number"
                            value={filters.year}
                            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        />
                        <FormInput
                            placeholder="Company"
                            value={filters.company}
                            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                        />
                        <FormInput
                            placeholder="Location"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </Card>

                {error && <div className="alert alert-error">{error}</div>}
                {loading && <div className="loading">Loading...</div>}

                <div className="cards-grid">
                    {users.map((user) => (
                        <Card key={user._id}>
                            <h3>{user.name}</h3>
                            {user.company && <p className="company">{user.company}</p>}
                            {user.gradYear && <p className="grad-year">Class of {user.gradYear}</p>}
                            {user.location && <p className="location">{user.location}</p>}
                            {user.skills?.length > 0 && (
                                <div className="tags">
                                    {user.skills.slice(0, 5).map((skill, i) => (
                                        <span key={i} className="tag">{skill}</span>
                                    ))}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {!loading && users.length === 0 && (
                    <p>No alumni found matching your search.</p>
                )}
            </div>
        </div>
    )
}

export default Directory
