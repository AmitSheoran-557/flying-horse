'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function CoursesPage() {
    const courses = [
        {
            id: 'pte',
            title: 'PTE Academic',
            description: 'Master the Pearson Test of English with our comprehensive course designed for success',
            price: '₹15,000',
            originalPrice: '₹20,000',
            duration: '8 weeks',
            students: '500+',
            rating: 4.8,
            image: '/images/pte-course.jpg',
            features: [
                'Live Interactive Classes',
                'Practice Tests & Mock Exams',
                'Personal Feedback & Correction',
                'Study Materials & Resources',
                'Speaking Practice Sessions',
                'Writing Task Guidance',
                'Score Improvement Guarantee'
            ],
            highlights: [
                'Expert Instructors',
                'Flexible Timings',
                'Small Batch Size',
                'Lifetime Support'
            ]
        },
        {
            id: 'ielts',
            title: 'IELTS Preparation',
            description: 'Achieve your target IELTS score with our proven methodology and expert guidance',
            price: '₹12,000',
            originalPrice: '₹16,000',
            duration: '10 weeks',
            students: '750+',
            rating: 4.9,
            image: '/images/ielts-course.jpg',
            features: [
                'All 4 Skills Training',
                'Speaking Practice with Native Speakers',
                'Writing Task 1 & 2 Mastery',
                'Reading Strategies & Techniques',
                'Listening Skills Development',
                'Band Score Prediction',
                'Unlimited Mock Tests'
            ],
            highlights: [
                'Band 7+ Guarantee',
                'Personalized Study Plan',
                'Weekly Progress Reports',
                'Free Retake Option'
            ]
        },
        {
            id: 'spoken-english',
            title: 'Spoken English',
            description: 'Build confidence in English communication for personal and professional growth',
            price: '₹8,000',
            originalPrice: '₹12,000',
            duration: '6 weeks',
            students: '1000+',
            rating: 4.7,
            image: '/images/spoken-english-course.jpg',
            features: [
                'Conversation Practice',
                'Pronunciation Training',
                'Grammar in Context',
                'Vocabulary Building',
                'Public Speaking Skills',
                'Interview Preparation',
                'Confidence Building Exercises'
            ],
            highlights: [
                'Interactive Sessions',
                'Real-life Scenarios',
                'Group Discussions',
                'Individual Attention'
            ]
        }
    ]

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Choose from our expertly designed courses to achieve your English proficiency goals
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card overflow-hidden"
                            >
                                {/* Course Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-gray-600">{course.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">{course.description}</p>

                                    {/* Course Stats */}
                                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="h-4 w-4" />
                                            <span>{course.students}</span>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="flex items-center space-x-3">
                                        <span className="text-3xl font-bold text-primary-600">{course.price}</span>
                                        <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                                            Save {Math.round((1 - parseInt(course.price.replace('₹', '').replace(',', '')) / parseInt(course.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%
                                        </span>
                                    </div>
                                </div>

                                {/* Course Features */}
                                <div className="p-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">What you'll learn:</h4>
                                    <ul className="space-y-2 mb-6">
                                        {course.features.slice(0, 4).map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-600">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {course.highlights.map((highlight, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-primary-50 text-primary-700 text-xs font-medium px-2 py-1 rounded"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="btn-primary w-full text-center block"
                                    >
                                        View Details & Enroll
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Our Courses */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Courses?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide comprehensive learning experiences designed for success
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Expert Instructors',
                                description: 'Learn from certified professionals with years of teaching experience'
                            },
                            {
                                title: 'Flexible Learning',
                                description: 'Access course materials anytime, anywhere with our online platform'
                            },
                            {
                                title: 'Proven Results',
                                description: 'High success rates with students achieving their target scores'
                            },
                            {
                                title: 'Ongoing Support',
                                description: 'Get continuous support even after course completion'
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}