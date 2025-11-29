import { useState, useEffect } from 'react'
import { getLeaderboard, getLeaderboardSummary, getLeaderboardFilters } from '../services/api'
import './Leaderboard.css'

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([])
    const [summary, setSummary] = useState(null)
    const [filters, setFilters] = useState({
        limit: 10,
        year: '',
        company: '',
        domain: '',
        country: '',
        city: '',
        page: 1
    })
    const [filterOptions, setFilterOptions] = useState({
        years: [],
        companies: [],
        locations: [],
        skills: []
    })
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({})
    const [activeTab, setActiveTab] = useState('top10')

    useEffect(() => {
        fetchLeaderboard()
        fetchSummary()
        fetchFilterOptions()
    }, [filters])

    const fetchLeaderboard = async () => {
        try {
            setLoading(true)
            const response = await getLeaderboard(filters)
            setLeaderboard(response.data.data)
            setPagination(response.data.pagination)
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSummary = async () => {
        try {
            const response = await getLeaderboardSummary()
            setSummary(response.data.data)
        } catch (error) {
            console.error('Failed to fetch summary:', error)
        }
    }

    const fetchFilterOptions = async () => {
        try {
            const response = await getLeaderboardFilters()
            setFilterOptions(response.data.data)
        } catch (error) {
            console.error('Failed to fetch filter options:', error)
        }
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        if (tab === 'top10') {
            setFilters({ ...filters, limit: 10, page: 1 })
        } else if (tab === 'top50') {
            setFilters({ ...filters, limit: 50, page: 1 })
        }
    }

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value, page: 1 })
    }

    const clearFilters = () => {
        setFilters({
            limit: filters.limit,
            year: '',
            company: '',
            domain: '',
            country: '',
            city: '',
            page: 1
        })
    }

    const getBadgeIcon = (badge) => {
        const icons = {
            'Gold': '🥇',
            'Silver': '🥈',
            'Bronze': '🥉',
            'Elite Mentor': '👑',
            'Active Contributor': '⭐',
            'Rising Star': '🌟',
            'Community Champion': '🏆',
            'Event Enthusiast': '🎉'
        }
        return icons[badge] || '🏅'
    }

    const getRankBadge = (rank) => {
        if (rank === 1) return { icon: '🥇', class: 'gold' }
        if (rank === 2) return { icon: '🥈', class: 'silver' }
        if (rank === 3) return { icon: '🥉', class: 'bronze' }
        return { icon: rank, class: 'default' }
    }

    const getScoreColor = (score) => {
        if (score >= 80) return 'elite'
        if (score >= 60) return 'high'
        if (score >= 40) return 'medium'
        return 'low'
    }

    return (
        <div className="leaderboard-page">
            <div className="leaderboard-header">
                <div className="header-content">
                    <h1>🏆 Alumni Leaderboard</h1>
                    <p>Celebrating our most active and impactful alumni</p>
                </div>
            </div>

            {/* AI Summary Section */}
            {summary && (
                <div className="summary-card">
                    <div className="summary-icon">🤖</div>
                    <div className="summary-content">
                        <h3>Weekly Insights</h3>
                        <p>{summary.overview}</p>
                        <div className="summary-stats">
                            <div className="stat-item">
                                <span className="stat-value">{summary.stats.totalAlumni}</span>
                                <span className="stat-label">Total Alumni</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{summary.stats.newThisWeek}</span>
                                <span className="stat-label">New This Week</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{summary.trends.mentorshipSessions}</span>
                                <span className="stat-label">Mentorship Sessions</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{summary.trends.communityPosts}</span>
                                <span className="stat-label">Community Posts</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="leaderboard-tabs">
                <button
                    className={`tab ${activeTab === 'top10' ? 'active' : ''}`}
                    onClick={() => handleTabChange('top10')}
                >
                    Top 10
                </button>
                <button
                    className={`tab ${activeTab === 'top50' ? 'active' : ''}`}
                    onClick={() => handleTabChange('top50')}
                >
                    Top 50
                </button>
                <button
                    className={`tab ${activeTab === 'filters' ? 'active' : ''}`}
                    onClick={() => setActiveTab('filters')}
                >
                    Filters
                </button>
            </div>

            {/* Filters Section */}
            {activeTab === 'filters' && (
                <div className="filters-section">
                    <div className="filters-grid">
                        <div className="filter-group">
                            <label>Graduation Year</label>
                            <select
                                value={filters.year}
                                onChange={(e) => handleFilterChange('year', e.target.value)}
                            >
                                <option value="">All Years</option>
                                {filterOptions.years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Company</label>
                            <select
                                value={filters.company}
                                onChange={(e) => handleFilterChange('company', e.target.value)}
                            >
                                <option value="">All Companies</option>
                                {filterOptions.companies.map(company => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Domain/Skill</label>
                            <select
                                value={filters.domain}
                                onChange={(e) => handleFilterChange('domain', e.target.value)}
                            >
                                <option value="">All Domains</option>
                                {filterOptions.skills.map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Location</label>
                            <select
                                value={filters.country}
                                onChange={(e) => handleFilterChange('country', e.target.value)}
                            >
                                <option value="">All Locations</option>
                                {filterOptions.locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className="clear-filters-btn" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                </div>
            )}

            {/* Leaderboard Table */}
            <div className="leaderboard-container">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading leaderboard...</p>
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className="empty-state">
                        <p>No alumni found matching your filters</p>
                    </div>
                ) : (
                    <>
                        <div className="leaderboard-table">
                            {leaderboard.map((entry) => {
                                const rankBadge = getRankBadge(entry.rank)
                                return (
                                    <div key={entry.user.id} className="leaderboard-row">
                                        <div className="rank-section">
                                            <div className={`rank-badge ${rankBadge.class}`}>
                                                {rankBadge.icon}
                                            </div>
                                            {entry.rankChange !== 0 && (
                                                <div className={`rank-change ${entry.rankChange > 0 ? 'up' : 'down'}`}>
                                                    {entry.rankChange > 0 ? '↑' : '↓'} {Math.abs(entry.rankChange)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="user-section">
                                            <div className="user-avatar">
                                                {entry.user.profilePicture ? (
                                                    <img src={entry.user.profilePicture} alt={entry.user.name} />
                                                ) : (
                                                    <div className="avatar-placeholder">
                                                        {entry.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="user-info">
                                                <h3>{entry.user.name}</h3>
                                                <p className="user-details">
                                                    {entry.user.company && <span>{entry.user.company}</span>}
                                                    {entry.user.gradYear && <span>Class of {entry.user.gradYear}</span>}
                                                    {entry.user.location && <span>{entry.user.location}</span>}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="scores-section">
                                            <div className="total-score">
                                                <div className={`score-circle ${getScoreColor(entry.scores.total)}`}>
                                                    {entry.scores.total.toFixed(1)}
                                                </div>
                                                <span className="score-label">Total Score</span>
                                            </div>
                                            <div className="score-breakdown">
                                                <div className="score-item">
                                                    <span className="score-icon">🎓</span>
                                                    <span className="score-value">{entry.scores.mentorship.toFixed(1)}</span>
                                                    <span className="score-name">Mentorship</span>
                                                </div>
                                                <div className="score-item">
                                                    <span className="score-icon">💬</span>
                                                    <span className="score-value">{entry.scores.engagement.toFixed(1)}</span>
                                                    <span className="score-name">Engagement</span>
                                                </div>
                                                <div className="score-item">
                                                    <span className="score-icon">🏆</span>
                                                    <span className="score-value">{entry.scores.achievement.toFixed(1)}</span>
                                                    <span className="score-name">Achievement</span>
                                                </div>
                                                <div className="score-item">
                                                    <span className="score-icon">🤝</span>
                                                    <span className="score-value">{entry.scores.contribution.toFixed(1)}</span>
                                                    <span className="score-name">Contribution</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="badges-section">
                                            {entry.badges.map((badge, idx) => (
                                                <div key={idx} className="badge" title={badge}>
                                                    {getBadgeIcon(badge)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="pagination">
                                <button
                                    disabled={filters.page === 1}
                                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                                >
                                    Previous
                                </button>
                                <span>Page {pagination.page} of {pagination.pages}</span>
                                <button
                                    disabled={filters.page === pagination.pages}
                                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Leaderboard
