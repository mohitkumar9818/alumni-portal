import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo3D from './Logo3D'

const Sidebar = () => {
    const location = useLocation()
    const { user } = useAuth()

    const isActive = (path) => location.pathname === path

    const menuItems = [
        { path: '/', icon: 'dashboard', label: 'Dashboard' },
        { path: '/directory', icon: 'users', label: 'Alumni Directory' },
        { path: '/events', icon: 'calendar', label: 'Events' },
        { path: '/mentors', icon: 'mentor', label: 'Mentorship' },
        { path: '/jobs', icon: 'briefcase', label: 'Job Board' },
        { path: '/leaderboard', icon: 'trophy', label: 'Leaderboard' },
        { path: '/ai-chat', icon: 'ai', label: 'AI Assistant' },
        { path: '/profile', icon: 'user', label: 'My Profile' },
        { path: '/admin', icon: 'settings', label: 'Settings', adminOnly: true },
    ]

    const getIcon = (iconName) => {
        const icons = {
            dashboard: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
            ),
            users: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            calendar: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            mentor: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
            ),
            briefcase: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
            ),
            user: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
            ai: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            ),
            trophy: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
            ),
            settings: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
                </svg>
            ),
        }
        return icons[iconName] || icons.dashboard
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Link to="/" className="sidebar-logo">
                    <Logo3D size="small" animated={true} />
                    <span>Alumni Portal</span>
                </Link>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    if (item.adminOnly && user?.role !== 'admin') return null

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                        >
                            <span className="sidebar-icon">{getIcon(item.icon)}</span>
                            <span className="sidebar-label">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {user && (
                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">{user.name}</div>
                            <div className="sidebar-user-role">Class of {user.gradYear || '2024'}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar
