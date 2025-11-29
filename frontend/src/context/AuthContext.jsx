import { createContext, useState, useEffect, useContext } from 'react'
import { getMe } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            loadUser()
        } else {
            setLoading(false)
        }
    }, [])

    const loadUser = async () => {
        try {
            const response = await getMe()
            setUser(response.data)
        } catch (error) {
            console.error('Failed to load user:', error)
            localStorage.removeItem('token')
        } finally {
            setLoading(false)
        }
    }

    const loginUser = (token, userData) => {
        localStorage.setItem('token', token)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const value = {
        user,
        loading,
        loginUser,
        logout,
        refreshUser: loadUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
