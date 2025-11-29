import { useState } from 'react'
import './LeaderboardPreview.css'

const LeaderboardPreview = ({ data, loading, animationsEnabled }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedProfile, setSelectedProfile] = useState(null)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % data.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') prevSlide()
        if (e.key === 'ArrowRight') nextSlide()
        if (e.key === 'Escape') setSelectedProfile(null)
    }

    const getRankBadge = (rank) => {
        if (rank === 1) return { icon: '🥇', class: 'gold' }
        if (rank === 2) return { icon: '🥈', class: 'silver' }
        if (rank === 3) return { icon: '🥉', class: 'bronze' }
        return { icon: rank, class: 'default' }
    }

    if (loading) {
        return (
            <div className="leaderboard-preview">
                <div className="section-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                    <h2>Top Alumni</h2>
                </div>
                <div className="loading-skeleton">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="skeleton-card"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="leaderboard-preview">
                <div className="section-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                    <h2>Top Alumni</h2>
                </div>
                <p className="empty-message">No leaderboard data available. Run seed-leaderboard.bat to populate data.</p>
            </div>
        )
    }

    return (
        <div className="leaderboard-preview" onKeyDown={handleKeyDown} tabIndex={0}>
            <div className="section-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                <h2>Top Alumni</h2>
                <a href="/leaderboard" className="view-all-link">View All →</a>
            </div>

            {/* Desktop: Horizontal Carousel */}
            <div className="carousel-container desktop-carousel">
                <button
                    className="carousel-btn prev"
                    onClick={prevSlide}
                    aria-label="Previous alumni"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="carousel-track">
                    {data.map((entry, index) => {
                        const rankBadge = getRankBadge(entry.rank)
                        const isActive = index === currentIndex

                        return (
                            <div
                                key={entry.user.id}
                                className={`leaderboard-card ${isActive ? 'active' : ''}`}
                                style={{
                                    transform: `translateX(${(index - currentIndex) * 110}%)`,
                                    opacity: isActive ? 1 : 0.6
                                }}
                                onClick={() => setSelectedProfile(entry)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => e.key === 'Enter' && setSelectedProfile(entry)}
                            >
                                <div className={`rank-badge ${rankBadge.class}`}>
                                    {rankBadge.icon}
                                </div>

                                <div className="profile-avatar">
                                    {entry.user.profilePicture ? (
                                        <img src={entry.user.profilePicture} alt={entry.user.name} />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            {entry.user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <h3 className="profile-name">{entry.user.name}</h3>
                                <p className="profile-batch">Class of {entry.user.gradYear || '2024'}</p>
                                <p className="profile-company">{entry.user.company || 'Alumni'}</p>

                                <div className="impact-score">
                                    <span className="score-label">Impact Score</span>
                                    <span className="score-value">{entry.scores.total.toFixed(1)}</span>
                                </div>

                                <div className="badges-mini">
                                    {entry.badges.slice(0, 3).map((badge, idx) => (
                                        <span key={idx} className="badge-mini" title={badge}>
                                            {badge === 'Gold' && '🥇'}
                                            {badge === 'Silver' && '🥈'}
                                            {badge === 'Bronze' && '🥉'}
                                            {badge === 'Elite Mentor' && '👑'}
                                            {badge === 'Active Contributor' && '⭐'}
                                            {badge === 'Rising Star' && '🌟'}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button
                    className="carousel-btn next"
                    onClick={nextSlide}
                    aria-label="Next alumni"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* Mobile: Vertical List */}
            <div className="mobile-list">
                {data.map((entry) => {
                    const rankBadge = getRankBadge(entry.rank)

                    return (
                        <div
                            key={entry.user.id}
                            className="leaderboard-card-mobile"
                            onClick={() => setSelectedProfile(entry)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && setSelectedProfile(entry)}
                        >
                            <div className={`rank-badge ${rankBadge.class}`}>
                                {rankBadge.icon}
                            </div>

                            <div className="profile-avatar-small">
                                {entry.user.profilePicture ? (
                                    <img src={entry.user.profilePicture} alt={entry.user.name} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {entry.user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="profile-info">
                                <h3>{entry.user.name}</h3>
                                <p>Class of {entry.user.gradYear || '2024'}</p>
                            </div>

                            <div className="score-badge">
                                {entry.scores.total.toFixed(1)}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Profile Modal */}
            {selectedProfile && (
                <div
                    className="profile-modal-overlay"
                    onClick={() => setSelectedProfile(null)}
                >
                    <div
                        className="profile-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <button
                            className="modal-close"
                            onClick={() => setSelectedProfile(null)}
                            aria-label="Close modal"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-header">
                            <div className="modal-avatar">
                                {selectedProfile.user.profilePicture ? (
                                    <img src={selectedProfile.user.profilePicture} alt={selectedProfile.user.name} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {selectedProfile.user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2 id="modal-title">{selectedProfile.user.name}</h2>
                                <p>{selectedProfile.user.company || 'Alumni'}</p>
                                <p className="modal-batch">Class of {selectedProfile.user.gradYear || '2024'}</p>
                            </div>
                        </div>

                        <div className="modal-scores">
                            <div className="score-item">
                                <span className="score-label">Total Impact</span>
                                <span className="score-value">{selectedProfile.scores.total.toFixed(1)}</span>
                            </div>
                            <div className="score-item">
                                <span className="score-label">Mentorship</span>
                                <span className="score-value">{selectedProfile.scores.mentorship.toFixed(1)}</span>
                            </div>
                            <div className="score-item">
                                <span className="score-label">Engagement</span>
                                <span className="score-value">{selectedProfile.scores.engagement.toFixed(1)}</span>
                            </div>
                            <div className="score-item">
                                <span className="score-label">Achievement</span>
                                <span className="score-value">{selectedProfile.scores.achievement.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className="modal-badges">
                            <h3>Badges</h3>
                            <div className="badges-grid">
                                {selectedProfile.badges.map((badge, idx) => (
                                    <div key={idx} className="badge-item">
                                        <span className="badge-icon">
                                            {badge === 'Gold' && '🥇'}
                                            {badge === 'Silver' && '🥈'}
                                            {badge === 'Bronze' && '🥉'}
                                            {badge === 'Elite Mentor' && '👑'}
                                            {badge === 'Active Contributor' && '⭐'}
                                            {badge === 'Rising Star' && '🌟'}
                                            {badge === 'Community Champion' && '🏆'}
                                            {badge === 'Event Enthusiast' && '🎉'}
                                        </span>
                                        <span className="badge-name">{badge}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LeaderboardPreview
