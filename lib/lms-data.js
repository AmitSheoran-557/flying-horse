export const coursePlans = [
    {
        id: 'spoken-english',
        name: 'Spoken English Mastery',
        amount: '3000',
        duration: '6 weeks',
        highlight: 'Fluency practice, grammar confidence, and live speaking drills.',
    },
    {
        id: 'ielts-preparation',
        name: 'IELTS Preparation',
        amount: '8000',
        duration: '10 weeks',
        highlight: 'Reading, writing, listening, and speaking training with mock tests.',
    },
    {
        id: 'pte-academic',
        name: 'PTE Academic',
        amount: '7000',
        duration: '8 weeks',
        highlight: 'AI-scored practice, exam strategies, and daily performance tracking.',
    },
]

export const paymentInstructions = [
    'Pay the selected course fee by UPI or bank transfer before submitting this form.',
    'Enter the exact UTR, transaction ID, or reference number from your payment receipt.',
    'Your payment will be reviewed by the admin after submission.',
]

export const paymentAccount = {
    upi: process.env.NEXT_PUBLIC_PAYMENT_UPI_ID || 'your-upi-id@bank',
    bankName: process.env.NEXT_PUBLIC_PAYMENT_BANK_NAME || 'Your Bank Name',
    accountName: process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME || 'Flying Horse LMS',
    accountNumber: process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NUMBER || '000000000000',
    ifsc: process.env.NEXT_PUBLIC_PAYMENT_IFSC || 'IFSC0000000',
}
