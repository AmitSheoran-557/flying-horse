import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { findUserByEmail } from '@/lib/data-store'

export async function POST(request) {
    try {
        const { email, password } = await request.json()
        const trimmedEmail = String(email || '').trim().toLowerCase()
        const rawPassword = String(password || '')

        if (!trimmedEmail || !rawPassword) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Find user
        const user = findUserByEmail(trimmedEmail)
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
            { userId: user.id, email: user.email, role: user.role },
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
        return NextResponse.json(
            { error: 'Unable to log in. Please try again.' },
            { status: 500 }
        )
    }
}
