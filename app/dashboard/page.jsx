'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Play, Lock, Calendar, Award, CreditCard, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [paymentAccount, setPaymentAccount] = useState(null)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login')
            return
        }

        // Fetch user's enrolled courses
        // In a real app, this would be an API call
        if (user) {
            // Mock enrolled courses data
            setEnrolledCourses([
                {
                    id: 'pte',
                    title: 'PTE Academic',
                    progress: 25,
                    totalLessons: 32,
                    completedLessons: 8,
                    nextLesson: 'Speaking Skills - Read Aloud',
                    enrolledDate: '2024-01-15',
                    canAccessToday: true,
                    daysUntilNextLesson: 0
                }
            ])
        }
    }, [user, loading, router])

    useEffect(() => {
        async function loadPaymentAccount() {
            try {
                const response = await fetch('/api/payment-account', { cache: 'no-store' })
                if (!response.ok) return
                setPaymentAccount(await response.json())
            } catch (error) {
                setPaymentAccount(null)
            }
        }

        loadPaymentAccount()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen">
            <Header />

            {/* Dashboard Header */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
                        <p className="text-xl text-blue-100">Continue your learning journey</p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {enrolledCourses.length === 0 ? (
                    /* No Courses Enrolled */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-16"
                    >
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Courses Enrolled</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start your learning journey by enrolling in one of our expert-designed courses
                        </p>
                        <Link href="/courses" className="btn-primary">
                            Browse Courses
                        </Link>
                    </motion.div>
                ) : (
                    /* Enrolled Courses */
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {enrolledCourses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="card p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                                        <div className="flex items-center space-x-2">
                                            <Award className="h-5 w-5 text-yellow-500" />
                                            <span className="text-sm font-medium text-gray-600">
                                                {course.progress}% Complete
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Next Lesson */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">Next Lesson:</h4>
                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            {course.canAccessToday ? (
                                                <Play className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            )}
                                            <span className="text-gray-700">{course.nextLesson}</span>
                                        </div>
                                        {!course.canAccessToday && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                Available in {course.daysUntilNextLesson} day(s)
                                            </p>
                                        )}
                                    </div>

                                    {/* Course Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="text-center p-3 bg-primary-50 rounded-lg">
                                            <Calendar className="h-5 w-5 text-primary-600 mx-auto mb-1" />
                                            <div className="text-sm font-medium text-gray-900">Enrolled</div>
                                            <div className="text-xs text-gray-600">
                                                {new Date(course.enrolledDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="text-center p-3 bg-green-50 rounded-lg">
                                            <Clock className="h-5 w-5 text-green-600 mx-auto mb-1" />
                                            <div className="text-sm font-medium text-gray-900">Time Left</div>
                                            <div className="text-xs text-gray-600">
                                                {Math.ceil((course.totalLessons - course.completedLessons) / 4)} weeks
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <Link
                                            href={`/learn/${course.id}`}
                                            className={`flex-1 text-center py-2 px-4 rounded-lg font-medium transition-colors ${course.canAccessToday
                                                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {course.canAccessToday ? 'Continue Learning' : 'Locked'}
                                        </Link>
                                        <Link
                                            href={`/courses/${course.id}`}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="card p-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Payment Verification</h3>
                                    <p className="mt-1 text-gray-600">Use the registered account below and submit only your UTR number for admin approval.</p>
                                </div>
                                <ShieldCheck className="h-8 w-8 flex-shrink-0 text-primary-600" />
                            </div>
                            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-lg bg-slate-50 p-4">
                                    <p className="text-sm text-gray-500">Registered A/C No</p>
                                    <p className="mt-1 font-semibold text-gray-950">{paymentAccount?.accountNumber || 'Loading...'}</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-4">
                                    <p className="text-sm text-gray-500">IFSC</p>
                                    <p className="mt-1 font-semibold text-gray-950">{paymentAccount?.ifsc || 'Loading...'}</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-4">
                                    <p className="text-sm text-gray-500">UPI</p>
                                    <p className="mt-1 font-semibold text-gray-950">{paymentAccount?.upi || 'Loading...'}</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-4">
                                    <p className="text-sm text-gray-500">Required Proof</p>
                                    <p className="mt-1 font-semibold text-gray-950">UTR number only</p>
                                </div>
                            </div>
                            <Link href="/subscribe" className="mt-5 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white transition hover:bg-primary-700">
                                <CreditCard className="mr-2 h-4 w-4" /> Submit UTR
                            </Link>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="card p-6"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Link
                                    href="/courses"
                                    className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                                >
                                    <BookOpen className="h-6 w-6 text-primary-600" />
                                    <span className="font-medium text-gray-900">Browse More Courses</span>
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    <Calendar className="h-6 w-6 text-green-600" />
                                    <span className="font-medium text-gray-900">Schedule Consultation</span>
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                                >
                                    <Award className="h-6 w-6 text-yellow-600" />
                                    <span className="font-medium text-gray-900">View Certificates</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
