'use client'

import { motion } from 'framer-motion'
import { Globe, Users, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function VisaCategorySection() {
    const visaCategories = [
        {
            title: 'Student Visa',
            description: 'Pursue your education at top universities worldwide. We assist with university selection, admission documentation, and complete student visa processing.',
            icon: <BookOpen className="h-16 w-16 text-gray-400" />
        },
        {
            title: 'Tourist Visa',
            description: 'Explore the world without the paperwork stress. Our team ensures quick and accurate tourist visa processing so you can focus on planning your trip.',
            icon: <Globe className="h-16 w-16 text-gray-400" />
        },
        {
            title: 'Ausbildung Visa',
            description: 'Begin your vocational training in Germany with confidence. We handle the complete Ausbildung visa process — from training contract verification to embassy interview preparation.',
            icon: <BookOpen className="h-16 w-16 text-gray-400" />
        }
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 text-primary-600 font-semibold mb-4">
                        <Globe className="h-5 w-5" />
                        <span className="uppercase text-sm tracking-wider">VISA CATEGORY</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Seeking Adventure Thrills<br />and Excitement Await
                    </h2>
                </motion.div>

                {/* Visa Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {visaCategories.map((visa, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="card p-6 hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="flex gap-6">
                                {/* Image Placeholder */}
                                <div className="w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex-shrink-0 flex items-center justify-center">
                                    {visa.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{visa.title}</h3>
                                    <p className="text-gray-600 mb-6">
                                        {visa.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href="/contact"
                                            className="w-12 h-12 border-2 border-primary-500 text-primary-600 rounded-xl flex items-center justify-center hover:bg-primary-50 transition-colors"
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}