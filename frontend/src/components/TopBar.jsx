import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const TopBar = () => {
    const { user, logout } = useAuth()
    const { theme, toggleTheme, isDark } = useTheme()
    const navigate = useNavigate()
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const profileRef = useRef(null)
    const notificationRef = useRef(null)

    // Sample notifications data
    const notifications = [
        {
            id: 1,
            type: 'connection',
            title: 'New Connection Request',
            message: 'Sarah Chen wants to connect with you',
            time: '5 minutes ago',
            read: false,
            avatar: 'S'
        },
        {
            id: 2,
            type: 'event',
            title: 'Event Reminder',
            message: 'Alumni Tech Meetup starts in 2 hours',
            time: '1 hour ago',
            read: false,
            avatar: '📅'
        },
        {
            id: 3,
            type: 'job',
            title: 'New Job Match',
            message: '3 new jobs match your profile',
            time: '3 hours ago',
            read: false,
            avatar: '💼'
        },
        {
            id: 4,
            type: 'message',
            title: 'New Message',
            message: 'Michael Rodriguez sent you a message',
            time: '5 hours ago',
            read: true,
            avatar: 'M'
        },
        {
            id: 5,
            type: 'recommendation',
            title: 'AI Recommendation',
            message: 'Your profile matches 5 new mentors',
            time: '1 day ago',
            read: true,
            avatar: '🤖'
        }
    ]

    const unreadCount = notifications.filter(n => !n.read).length

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false)
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const getNotificationIcon = (type) => {
        const icons = {
            connection: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
            ),
            event: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            job: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
            ),
            message: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
            recommendation: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            )
        }
        return icons[type] || icons.message
    }

    return (
        <div className="topbar">
            <div className="topbar-search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Search alumni, events, jobs..."
                    className="topbar-search-input"
                />
            </div>

            <div className="topbar-actions">
                <button className="topbar-icon-btn" onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
                    {isDark ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>

                <div ref={notificationRef} style={{ position: 'relative' }}>
                    <button
                        className="topbar-icon-btn topbar-notifications"
                        onClick={() => setShowNotifications(!showNotifications)}
                        title="Notifications"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                    </button>

                    {showNotifications && (
                        <div className="notifications-dropdown">
                            <div className="notifications-header">
                                <h3>Notifications</h3>
                                <button className="mark-all-read">Mark all as read</button>
                            </div>
                            <div className="notifications-list">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                    >
                                        <div className="notification-icon">
                                            {typeof notification.avatar === 'string' && notification.avatar.length === 1 ? (
                                                <div className="notification-avatar">{notification.avatar}</div>
                                            ) : (
                                                <div className="notification-icon-wrapper">
                                                    {notification.avatar}
                                                </div>
                                            )}
                                        </div>
                                        <div className="notification-content">
                                            <div className="notification-title">{notification.title}</div>
                                            <div className="notification-message">{notification.message}</div>
                                            <div className="notification-time">{notification.time}</div>
                                        </div>
                                        {!notification.read && <div className="notification-dot"></div>}
                                    </div>
                                ))}
                            </div>
                            <div className="notifications-footer">
                                <button className="view-all-btn">View all notifications</button>
                            </div>
                        </div>
                    )}
                </div>

                <div ref={profileRef} className="topbar-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <div className="topbar-profile-avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>

                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            <div className="profile-dropdown-header">
                                <div className="profile-dropdown-avatar">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="profile-dropdown-name">{user?.name}</div>
                                    <div className="profile-dropdown-email">{user?.email}</div>
                                </div>
                            </div>
                            <div className="profile-dropdown-divider"></div>
                            <button onClick={() => { navigate('/profile'); setShowProfileMenu(false); }} className="profile-dropdown-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                My Profile
                            </button>
                            <button onClick={() => { navigate('/admin'); setShowProfileMenu(false); }} className="profile-dropdown-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
                                </svg>
                                Settings
                            </button>
                            <div className="profile-dropdown-divider"></div>
                            <button onClick={handleLogout} className="profile-dropdown-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TopBar
