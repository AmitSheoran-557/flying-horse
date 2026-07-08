'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        // Check if user is logged in on mount
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (token) {
            // Verify token and get user data
            fetch('/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        setUser(data.user)
                    } else {
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('token')
                        }
                    }
                })
                .catch(() => {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token')
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [mounted])

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', data.token)
                }
                setUser(data.user)
                return { success: true }
            }
            return { success: false, error: data.error || 'Login failed' }
        } catch (error) {
            return { success: false, error: 'Login failed. Please try again.' }
        }
    }

    const register = async (name, email, password) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', data.token)
                }
                setUser(data.user)
                return { success: true }
            }
            return { success: false, error: data.error || 'Failed to create account' }
        } catch (error) {
            return { success: false, error: 'Failed to create account. Please try again.' }
        }
    }

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
        }
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
