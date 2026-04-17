import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// In a real app, you would use a database
// For demo purposes, we'll use a simple in-memory store
const users = []

export async function POST(request) {
    try {
        const { name, email, password } = await request.json()

        // Check if user already exists
        const existingUser = users.find(user => user.email === email)
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            enrolledCourses: [],
            createdAt: new Date()
        }

        users.push(user)

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        )

        // Return user data (without password)
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
            message: 'User created successfully',
            token,
            user: userWithoutPassword
        })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}