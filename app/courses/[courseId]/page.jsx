'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Users, Star, Play, Lock, CreditCard } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

export default function CourseDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { user } = useAuth()
    const [isEnrolling, setIsEnrolling] = useState(false)

    const courseId = params.courseId

    const courseData = {
        pte: {
            title: 'PTE Academic',
            description: 'Master the Pearson Test of English with our comprehensive course designed for success',
            price: 7000,
            originalPrice: 20000,
            duration: '8 weeks',
            students: '500+',
            rating: 4.8,
            totalLessons: 32,
            features: [
                'Live Interactive Classes',
                'Practice Tests & Mock Exams',
                'Personal Feedback & Correction',
                'Study Materials & Resources',
                'Speaking Practice Sessions',
                'Writing Task Guidance',
                'Score Improvement Guarantee',
                'Flexible Scheduling',
                'Expert Instructors',
                'Small Batch Size'
            ],
            curriculum: [
                { week: 1, title: 'Introduction to PTE', lessons: 4, topics: ['PTE Format Overview', 'Speaking Basics', 'Reading Strategies', 'Listening Fundamentals'] },
                { week: 2, title: 'Speaking Skills', lessons: 4, topics: ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Re-tell Lecture'] },
                { week: 3, title: 'Writing Skills', lessons: 4, topics: ['Summarize Written Text', 'Essay Writing', 'Grammar Focus', 'Vocabulary Building'] },
                { week: 4, title: 'Reading Skills', lessons: 4, topics: ['Multiple Choice', 'Re-order Paragraphs', 'Fill in Blanks', 'Reading Strategies'] },
                { week: 5, title: 'Listening Skills', lessons: 4, topics: ['Summarize Spoken Text', 'Multiple Choice', 'Fill in Blanks', 'Highlight Correct Summary'] },
                { week: 6, title: 'Integrated Skills', lessons: 4, topics: ['Speaking & Writing', 'Reading & Writing', 'Listening & Writing', 'Time Management'] },
                { week: 7, title: 'Practice Tests', lessons: 4, topics: ['Full Mock Test 1', 'Analysis & Feedback', 'Full Mock Test 2', 'Score Prediction'] },
                { week: 8, title: 'Final Preparation', lessons: 4, topics: ['Exam Strategies', 'Last Minute Tips', 'Confidence Building', 'Final Mock Test'] }
            ]
        },
        ielts: {
            title: 'IELTS Preparation',
            description: 'Achieve your target IELTS score with our proven methodology and expert guidance',
            price: 8000,
            originalPrice: 16000,
            duration: '10 weeks',
            students: '750+',
            rating: 4.9,
            totalLessons: 40,
            features: [
                'All 4 Skills Training',
                'Speaking Practice with Native Speakers',
                'Writing Task 1 & 2 Mastery',
                'Reading Strategies & Techniques',
                'Listening Skills Development',
                'Band Score Prediction',
                'Unlimited Mock Tests',
                'Personal Study Plan',
                'Weekly Progress Reports',
                'Free Retake Option'
            ],
            curriculum: [
                { week: 1, title: 'IELTS Overview', lessons: 4, topics: ['Test Format', 'Scoring System', 'Study Planning', 'Initial Assessment'] },
                { week: 2, title: 'Listening Skills', lessons: 4, topics: ['Section 1 & 2', 'Section 3 & 4', 'Note Taking', 'Practice Tests'] },
                { week: 3, title: 'Reading Skills', lessons: 4, topics: ['Skimming & Scanning', 'Question Types', 'Time Management', 'Academic Texts'] },
                { week: 4, title: 'Writing Task 1', lessons: 4, topics: ['Graphs & Charts', 'Process Diagrams', 'Maps', 'Data Analysis'] },
                { week: 5, title: 'Writing Task 2', lessons: 4, topics: ['Essay Types', 'Structure & Planning', 'Arguments & Examples', 'Coherence & Cohesion'] },
                { week: 6, title: 'Speaking Part 1', lessons: 4, topics: ['Personal Questions', 'Fluency Building', 'Pronunciation', 'Common Topics'] },
                { week: 7, title: 'Speaking Part 2 & 3', lessons: 4, topics: ['Cue Cards', 'Extended Speaking', 'Discussion Skills', 'Advanced Vocabulary'] },
                { week: 8, title: 'Integrated Practice', lessons: 4, topics: ['Full Practice Tests', 'Weakness Analysis', 'Improvement Strategies', 'Mock Interviews'] },
                { week: 9, title: 'Advanced Techniques', lessons: 4, topics: ['Band 7+ Strategies', 'Complex Grammar', 'Advanced Vocabulary', 'Exam Psychology'] },
                { week: 10, title: 'Final Preparation', lessons: 4, topics: ['Final Mock Tests', 'Score Prediction', 'Exam Day Tips', 'Confidence Building'] }
            ]
        },
        'spoken-english': {
            title: 'Spoken English',
            description: 'Build confidence in English communication for personal and professional growth',
            price: 3000,
            originalPrice: 12000,
            duration: '6 weeks',
            students: '1000+',
            rating: 4.7,
            totalLessons: 24,
            features: [
                'Conversation Practice',
                'Pronunciation Training',
                'Grammar in Context',
                'Vocabulary Building',
                'Public Speaking Skills',
                'Interview Preparation',
                'Confidence Building Exercises',
                'Interactive Sessions',
                'Real-life Scenarios',
                'Individual Attention'
            ],
            curriculum: [
                { week: 1, title: 'Foundation', lessons: 4, topics: ['Basic Conversation', 'Pronunciation Basics', 'Common Phrases', 'Self Introduction'] },
                { week: 2, title: 'Daily Communication', lessons: 4, topics: ['Shopping & Dining', 'Asking Directions', 'Phone Conversations', 'Social Interactions'] },
                { week: 3, title: 'Professional English', lessons: 4, topics: ['Office Communication', 'Email Writing', 'Presentations', 'Meeting Participation'] },
                { week: 4, title: 'Advanced Conversations', lessons: 4, topics: ['Expressing Opinions', 'Debates & Discussions', 'Storytelling', 'Cultural Topics'] },
                { week: 5, title: 'Public Speaking', lessons: 4, topics: ['Speech Preparation', 'Body Language', 'Overcoming Fear', 'Audience Engagement'] },
                { week: 6, title: 'Mastery & Practice', lessons: 4, topics: ['Interview Skills', 'Fluency Building', 'Final Presentations', 'Confidence Assessment'] }
            ]
        }
    }

    const course = courseData[courseId]

    if (!course) {
        return <div>Course not found</div>
    }

    const handleEnrollment = async () => {
        if (!user) {
            toast.error('Please login to enroll in the course')
            router.push('/auth/login')
            return
        }

        setIsEnrolling(true)

        try {
            // Create Stripe checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    courseId,
                    courseName: course.title,
                    price: course.price
                }),
            })

            const { url } = await response.json()

            if (url) {
                window.location.href = url
            } else {
                toast.error('Failed to create checkout session')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsEnrolling(false)
        }
    }

    return (
        <div className="min-h-screen">
            <Header />

            {/* Course Header */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                            <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                            <div className="flex items-center space-x-6 mb-6">
                                <div className="flex items-center space-x-1">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <span className="font-medium">{course.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Users className="h-5 w-5" />
                                    <span>{course.students} students</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock className="h-5 w-5" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 mb-8">
                                <span className="text-4xl font-bold">₹{course.price.toLocaleString()}</span>
                                <span className="text-xl text-blue-200 line-through">₹{course.originalPrice.toLocaleString()}</span>
                                <span className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded">
                                    Save {Math.round((1 - course.price / course.originalPrice) * 100)}%
                                </span>
                            </div>

                            <button
                                onClick={handleEnrollment}
                                disabled={isEnrolling}
                                className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isEnrolling ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="h-5 w-5" />
                                        <span>Enroll Now</span>
                                    </>
                                )}
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="card p-8"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Course Includes:</h3>
                            <ul className="space-y-3">
                                {course.features.slice(0, 6).map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-700">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>Total Lessons:</span>
                                    <span className="font-medium">{course.totalLessons}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Course Curriculum */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
                        <p className="text-xl text-gray-600">
                            Structured learning path designed for maximum effectiveness
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {course.curriculum.map((week, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                                <span className="font-bold text-primary-600">{week.week}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">{week.title}</h3>
                                                <p className="text-gray-600">{week.lessons} lessons</p>
                                            </div>
                                        </div>
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {week.topics.map((topic, topicIndex) => (
                                            <div
                                                key={topicIndex}
                                                className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"
                                            >
                                                <Play className="h-4 w-4 text-primary-600 flex-shrink-0" />
                                                <span>{topic}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Features */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Get</h2>
                        <p className="text-xl text-gray-600">
                            Comprehensive learning experience with all the tools you need
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {course.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm"
                            >
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}