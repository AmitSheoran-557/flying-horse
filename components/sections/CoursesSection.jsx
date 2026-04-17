'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CoursesSection() {
    const courses = [
        {
            id: 'pte',
            title: 'PTE Academic',
            description: 'Master the Pearson Test of English with our comprehensive course',
            price: '₹7,000',
            duration: '8 weeks',
            features: ['Live Classes', 'Practice Tests', 'Personal Feedback', 'Study Materials']
        },
        {
            id: 'ielts',
            title: 'IELTS Preparation',
            description: 'Achieve your target IELTS score with expert guidance',
            price: '₹8,000',
            duration: '10 weeks',
            features: ['Speaking Practice', 'Writing Correction', 'Mock Tests', 'Band Score Guarantee']
        },
        {
            id: 'spoken-english',
            title: 'Spoken English',
            description: 'Build confidence in English communication',
            price: '₹3,000',
            duration: '6 weeks',
            features: ['Conversation Practice', 'Pronunciation Training', 'Grammar Focus', 'Confidence Building']
        }
    ]

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose from our expertly designed courses to achieve your English proficiency goals
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="card p-8"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                                <div className="text-2xl font-bold text-primary-600">{course.price}</div>
                            </div>
                            <p className="text-gray-600 mb-6">{course.description}</p>
                            <div className="mb-6">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <span>Duration: {course.duration}</span>
                                </div>
                            </div>
                            <ul className="space-y-2 mb-8">
                                {course.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`/courses/${course.id}`}
                                className="btn-primary w-full text-center block"
                            >
                                Enroll Now
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}