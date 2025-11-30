import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import MentorList from './pages/MentorList'
import JobsList from './pages/JobsList'
import EventsList from './pages/EventsList'
import Directory from './pages/Directory'
import Admin from './pages/Admin'
import AIChat from './pages/AIChat'
import Leaderboard from './pages/Leaderboard'
import './App.css'

function AppContent() {
    const location = useLocation()
    const { user } = useAuth()
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

    // If not authenticated and not on auth page, redirect to login
    if (!user && !isAuthPage) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="app">
            {!isAuthPage && user && (
                <>
                    <Sidebar />
                    <div className="app-main">
                        <TopBar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                <Route path="/mentors" element={<ProtectedRoute><MentorList /></ProtectedRoute>} />
                                <Route path="/jobs" element={<ProtectedRoute><JobsList /></ProtectedRoute>} />
                                <Route path="/events" element={<ProtectedRoute><EventsList /></ProtectedRoute>} />
                                <Route path="/directory" element={<ProtectedRoute><Directory /></ProtectedRoute>} />
                                <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                                <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
                                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </main>
                    </div>
                </>
            )}
            {isAuthPage && (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            )}
        </div>
    )
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <AppContent />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
