import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '@/lib/data-store'

export async function POST(request) {
    try {
        const { name, email, password } = await request.json()
        const trimmedName = String(name || '').trim()
        const trimmedEmail = String(email || '').trim().toLowerCase()
        const rawPassword = String(password || '')

        if (!trimmedName || !trimmedEmail || !rawPassword) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            )
        }

        if (rawPassword.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = findUserByEmail(trimmedEmail)
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(rawPassword, 12)

        // Create user
        const user = createUser({
            name: trimmedName,
            email: trimmedEmail,
            password: hashedPassword,
            role: 'student',
            enrolledCourses: [],
        })

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
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
        return NextResponse.json(
            { error: 'Unable to create account. Please try again.' },
            { status: 500 }
        )
    }
}
