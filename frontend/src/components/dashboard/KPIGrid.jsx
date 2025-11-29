import { useState } from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import './KPIGrid.css'

const KPIGrid = ({ animationsEnabled }) => {
    const [kpis] = useState([
        {
            id: 1,
            title: 'Monthly Active Users',
            value: '2,847',
            change: '+12.5%',
            trend: 'up',
            icon: 'users',
            color: '#4f46e5',
            data: [
                { value: 2100 },
                { value: 2300 },
                { value: 2200 },
                { value: 2500 },
                { value: 2600 },
                { value: 2700 },
                { value: 2847 }
            ]
        },
        {
            id: 2,
            title: 'Mentorships This Week',
            value: '156',
            change: '+8.3%',
            trend: 'up',
            icon: 'trending',
            color: '#10b981',
            data: [
                { value: 120 },
                { value: 130 },
                { value: 125 },
                { value: 140 },
                { value: 145 },
                { value: 150 },
                { value: 156 }
            ]
        },
        {
            id: 3,
            title: 'Donations This Month',
            value: '$12,450',
            change: '+15.2%',
            trend: 'up',
            icon: 'dollar',
            color: '#f59e0b',
            data: [
                { value: 9000 },
                { value: 9500 },
                { value: 10000 },
                { value: 10500 },
                { value: 11000 },
                { value: 11500 },
                { value: 12450 }
            ]
        },
        {
            id: 4,
            title: 'Events Today',
            value: '8',
            change: '+2',
            trend: 'up',
            icon: 'calendar',
            color: '#8b5cf6',
            data: [
                { value: 5 },
                { value: 6 },
                { value: 5 },
                { value: 7 },
                { value: 6 },
                { value: 7 },
                { value: 8 }
            ]
        }
    ])

    const [hoveredCard, setHoveredCard] = useState(null)

    const getIcon = (iconName) => {
        const icons = {
            users: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            trending: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                </svg>
            ),
            dollar: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
            calendar: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            )
        }
        return icons[iconName] || icons.users
    }

    return (
        <div className="kpi-grid">
            {kpis.map((kpi) => {
                const isHovered = hoveredCard === kpi.id

                return (
                    <div
                        key={kpi.id}
                        className={`kpi-card ${isHovered ? 'hovered' : ''}`}
                        onMouseEnter={() => setHoveredCard(kpi.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="kpi-header">
                            <div className="kpi-icon" style={{ background: `${kpi.color}20`, color: kpi.color }}>
                                {getIcon(kpi.icon)}
                            </div>
                            <span className={`kpi-change ${kpi.trend}`}>
                                {kpi.change}
                            </span>
                        </div>

                        <div className="kpi-content">
                            <h3 className="kpi-value">{kpi.value}</h3>
                            <p className="kpi-title">{kpi.title}</p>
                        </div>

                        <div className="kpi-chart">
                            <ResponsiveContainer width="100%" height={50}>
                                <LineChart data={kpi.data}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={kpi.color}
                                        strokeWidth={2}
                                        dot={false}
                                        animationDuration={animationsEnabled ? 1000 : 0}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default KPIGrid
