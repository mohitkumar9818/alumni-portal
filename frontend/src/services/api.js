import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Auth
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)

// Users
export const getMe = () => api.get('/users/me')
export const updateMe = (data) => api.put('/users/me', data)
export const getUser = (id) => api.get(`/users/${id}`)

// Recommendations
export const getRecommendations = () => api.post('/recommendations')

// Directory
export const searchDirectory = (params) => api.get('/directory', { params })

// Events
export const getEvents = () => api.get('/events')
export const createEvent = (data) => api.post('/events', data)
export const registerForEvent = (id) => api.post(`/events/${id}/register`)

// Jobs
export const getJobs = (params) => api.get('/jobs', { params })
export const createJob = (data) => api.post('/jobs', data)

// Donations
export const createDonation = (data) => api.post('/donations', data)
export const getMyDonations = () => api.get('/donations/my')

// AI Chat
export const sendChatMessage = (message) => api.post('/ai/chat', { message })

// Leaderboard
export const getLeaderboard = (params) => api.get('/leaderboard', { params })
export const getLeaderboardSummary = () => api.get('/leaderboard/summary')
export const getLeaderboardFilters = () => api.get('/leaderboard/filters/options')
export const getUserLeaderboard = (userId) => api.get(`/leaderboard/user/${userId}`)
export const updateLeaderboard = (userId, metrics) => api.post(`/leaderboard/update/${userId}`, { metrics })

export default api
