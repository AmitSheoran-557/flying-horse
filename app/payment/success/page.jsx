'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, BookOpen, ArrowRight } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [courseTitle, setCourseTitle] = useState('')

    const sessionId = searchParams.get('session_id')
    const courseId = searchParams.get('course_id')

    useEffect(() => {
        if (!sessionId || !courseId) {
            router.push('/courses')
            return
        }

        // Verify payment and enroll user
        const verifyPayment = async () => {
            try {
                // In a real app, you would verify the payment with Stripe
                // and enroll the user in the course

                // Mock course titles
                const courseTitles = {
                    'pte': 'PTE Academic',
                    'ielts': 'IELTS Preparation',
                    'spoken-english': 'Spoken English'
                }

                setCourseTitle(courseTitles[courseId] || 'Course')

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500))

                setIsLoading(false)
            } catch (error) {
                console.error('Payment verification error:', error)
                router.push('/courses')
            }
        }

        verifyPayment()
    }, [sessionId, courseId, router])

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Verifying your payment...</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Header />

            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md w-full"
                >
                    <div className="card p-8 text-center">
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </motion.div>

                        {/* Success Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Payment Successful!
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Congratulations! You have successfully enrolled in <strong>{courseTitle}</strong>.
                            </p>
                        </motion.div>

                        {/* Course Access Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-blue-50 p-4 rounded-lg mb-6"
                        >
                            <div className="flex items-center space-x-2 mb-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-blue-900">Course Access</span>
                            </div>
                            <p className="text-sm text-blue-700">
                                Your course will be available in your dashboard. Remember, one lesson unlocks each day to ensure optimal learning pace.
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="space-y-4"
                        >
                            <Link
                                href="/dashboard"
                                className="btn-primary w-full flex items-center justify-center"
                            >
                                Go to Dashboard
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>

                            <Link
                                href={`/learn/${courseId}`}
                                className="btn-secondary w-full"
                            >
                                Start Learning Now
                            </Link>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8 pt-6 border-t border-gray-200"
                        >
                            <p className="text-sm text-gray-500">
                                A confirmation email has been sent to your registered email address.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    )
}