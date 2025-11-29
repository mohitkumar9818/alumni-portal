import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/api'
import FormInput from '../components/FormInput'
import Logo3D from '../components/Logo3D'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gradYear: '',
        company: '',
        location: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { loginUser } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await register({
                ...formData,
                gradYear: formData.gradYear ? parseInt(formData.gradYear) : undefined
            })
            loginUser(response.data.token, response.data.user)
            navigate('/profile')
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page-3d">
            {/* Animated 3D Background */}
            <div className="auth-background-3d">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                </div>

                {/* 3D Illustration Elements */}
                <div className="illustration-container">
                    <div className="person person-1">👨‍🎓</div>
                    <div className="person person-2">👩‍🏫</div>
                    <div className="person person-3">👨‍💼</div>
                    <div className="person person-4">👩‍💻</div>
                    <div className="book book-1">📚</div>
                    <div className="book book-2">📖</div>
                    <div className="graduation-cap">🎓</div>
                </div>
            </div>

            {/* Register Card with 3D Effect */}
            <div className="auth-card-3d">
                <div className="auth-card-inner">
                    {/* 3D Logo */}
                    <div className="logo-3d">
                        <Logo3D size="large" animated={true} />
                    </div>

                    <h1 className="auth-title-3d">Alumni Portal</h1>
                    <p className="auth-subtitle-3d">Join your lifelong community</p>

                    <div className="auth-tabs-3d">
                        <Link to="/login" className="auth-tab-3d">Sign In</Link>
                        <Link to="/register" className="auth-tab-3d active">Sign Up</Link>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form-3d">
                        <FormInput
                            label="Full Name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <FormInput
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormInput
                                label="Graduation Year"
                                type="number"
                                placeholder="2024"
                                value={formData.gradYear}
                                onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                            />
                            <FormInput
                                label="Location"
                                type="text"
                                placeholder="City, Country"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                        <FormInput
                            label="Company"
                            type="text"
                            placeholder="Current company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                        <button type="submit" className="btn-3d btn-primary-3d" disabled={loading}>
                            {loading ? (
                                <span className="btn-loading">
                                    <span className="spinner-3d"></span>
                                    Creating account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="auth-divider-3d">
                        <span>Or sign up with</span>
                    </div>

                    {/* 3D Social Buttons */}
                    <div className="social-buttons-3d">
                        <button className="social-btn-3d google-btn-3d">
                            <div className="social-icon-3d">
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>
                            <span>Google</span>
                        </button>

                        <button className="social-btn-3d linkedin-btn-3d">
                            <div className="social-icon-3d">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="#0077B5">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <span>LinkedIn</span>
                        </button>
                    </div>

                    <p className="auth-link-3d">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
