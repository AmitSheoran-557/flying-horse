import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        upi: process.env.PAYMENT_UPI_ID || process.env.NEXT_PUBLIC_PAYMENT_UPI_ID || 'your-upi-id@bank',
        bankName: process.env.PAYMENT_BANK_NAME || process.env.NEXT_PUBLIC_PAYMENT_BANK_NAME || 'Your Bank Name',
        accountName: process.env.PAYMENT_ACCOUNT_NAME || process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME || 'Flying Horse LMS',
        accountNumber: process.env.PAYMENT_ACCOUNT_NUMBER || process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER || '000000000000',
        ifsc: process.env.PAYMENT_IFSC || process.env.NEXT_PUBLIC_PAYMENT_IFSC || 'IFSC0000000',
    })
}
