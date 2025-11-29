import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getLeaderboard } from '../services/api'
import './Dashboard.css'

// Import components directly (no lazy loading for now to debug)
import HeroGreeting from '../components/dashboard/HeroGreeting'
import KPIGrid from '../components/dashboard/KPIGrid'
import LeaderboardPreview from '../components/dashboard/LeaderboardPreview'
import AIWidget from '../components/dashboard/AIWidget'

const Dashboard = () => {
    const { user } = useAuth()
    const [leaderboardData, setLeaderboardData] = useState([])
    const [loading, setLoading] = useState(true)
    const [animationsEnabled, setAnimationsEnabled] = useState(true)
    const [show3D, setShow3D] = useState(false)

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setAnimationsEnabled(!mediaQuery.matches)

        const handleChange = () => setAnimationsEnabled(!mediaQuery.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    // Check for lowPower query param and WebGL support
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const lowPower = urlParams.get('lowPower') === '1'
        const isMobile = window.innerWidth < 768

        // Check WebGL support
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        const hasWebGL = !!gl

        setShow3D(!lowPower && !isMobile && hasWebGL)
    }, [])

    useEffect(() => {
        loadLeaderboard()
    }, [])

    const loadLeaderboard = async () => {
        try {
            const response = await getLeaderboard({ limit: 5 })
            setLeaderboardData(response.data.data || [])
        } catch (err) {
            console.error('Failed to load leaderboard:', err)
        } finally {
            setLoading(false)
        }
    }

    const toggleAnimations = () => {
        setAnimationsEnabled(!animationsEnabled)
    }

    return (
        <div className="modern-dashboard">
            {/* Animation Toggle */}
            <button
                className="animation-toggle"
                onClick={toggleAnimations}
                title={animationsEnabled ? 'Disable animations' : 'Enable animations'}
                aria-label={animationsEnabled ? 'Disable animations' : 'Enable animations'}
            >
                {animationsEnabled ? '🎬' : '⏸️'}
            </button>

            {/* Hero Greeting Section */}
            <HeroGreeting user={user} animationsEnabled={animationsEnabled} />

            {/* KPI Grid */}
            <KPIGrid animationsEnabled={animationsEnabled} />

            {/* 2D Map (3D disabled for now to simplify) */}
            <div className="map-2d-fallback">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1200px-Equirectangular_projection_SW.jpg"
                    alt="World map showing alumni network"
                    loading="lazy"
                />
                <div className="map-overlay">
                    <h3>🌍 Global Alumni Network</h3>
                    <p>Alumni connected across 50+ countries</p>
                </div>
            </div>

            {/* Leaderboard Preview */}
            <LeaderboardPreview
                data={leaderboardData}
                loading={loading}
                animationsEnabled={animationsEnabled}
            />

            {/* AI Chat Widget */}
            <AIWidget
                user={user}
                animationsEnabled={animationsEnabled}
            />
        </div>
    )
}

export default Dashboard
