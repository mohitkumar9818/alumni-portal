import './HeroGreeting.css'

const HeroGreeting = ({ user, animationsEnabled }) => {
    const getGreeting = () => {
        const hour = new Date().getHours()

        if (hour >= 5 && hour < 12) {
            return { text: 'Good Morning', emoji: '🌅', color: '#f59e0b' }
        } else if (hour >= 12 && hour < 17) {
            return { text: 'Good Afternoon', emoji: '☀️', color: '#3b82f6' }
        } else if (hour >= 17 && hour < 21) {
            return { text: 'Good Evening', emoji: '🌆', color: '#8b5cf6' }
        } else {
            return { text: 'Good Night', emoji: '🌙', color: '#6366f1' }
        }
    }

    const greeting = getGreeting()

    return (
        <div
            className="hero-greeting"
            style={{ '--greeting-color': greeting.color }}
        >
            <div className="greeting-content">
                <div className="greeting-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>AI-Powered Dashboard</span>
                </div>
                <h1 className="greeting-title">
                    {greeting.text}, {user?.name}! <span className="greeting-emoji">{greeting.emoji}</span>
                </h1>
                <p className="greeting-subtitle">
                    Welcome back to your alumni network. Here's what's happening today.
                </p>
            </div>
            <div className="greeting-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-circle"></div>
                <div className="decoration-circle"></div>
            </div>
        </div>
    )
}

export default HeroGreeting
