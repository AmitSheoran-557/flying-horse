import { NextRequest, NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { name, email, phone, subject, message } = await request.json()

        // In a real app, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Integrate with CRM system

        console.log('Contact form submission:', {
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        })

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json({
            message: 'Message sent successfully',
            success: true
        })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}