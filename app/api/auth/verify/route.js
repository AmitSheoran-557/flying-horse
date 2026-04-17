import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// In a real app, you would use a database
const users = []

export async function GET(request) {
    try {
        const authHeader = request.headers.get('authorization')
        const token = authHeader?.split(' ')[1]

        if (!token) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            )
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')

        // Find user
        const user = users.find(user => user.id === decoded.userId)
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Return user data (without password)
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
            user: userWithoutPassword
        })
    } catch (error) {
        console.error('Token verification error:', error)
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        )
    }
}