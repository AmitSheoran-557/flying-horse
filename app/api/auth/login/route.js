import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// In a real app, you would use a database
// For demo purposes, we'll use the same in-memory store
// This would be imported from a shared module in a real app
const users = []

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        // Find user
        const user = users.find(user => user.email === email)
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        )

        // Return user data (without password)
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}