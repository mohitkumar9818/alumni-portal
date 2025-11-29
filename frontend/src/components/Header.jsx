import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">Alumni Portal</Link>
                <nav className="nav">
                    {user ? (
                        <>
                            <Link to="/">Dashboard</Link>
                            <Link to="/mentors">Mentors</Link>
                            <Link to="/jobs">Jobs</Link>
                            <Link to="/events">Events</Link>
                            <Link to="/directory">Directory</Link>
                            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
                            <Link to="/profile">Profile</Link>
                            <button onClick={handleLogout} className="btn-link">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
