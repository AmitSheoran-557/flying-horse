'use client'

import { motion } from 'framer-motion'
import { Globe, Users, BookOpen, Briefcase, GraduationCap, Plane, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'

export default function ServicesPage() {
    const visaServices = [

        {
            icon: <GraduationCap className="h-12 w-12" />,
            title: 'Student Visa',
            description: 'Complete support for student visa applications including university admissions, documentation, and visa interview preparation.',
            features: [
                'University selection',
                'Admission assistance',
                'Financial documentation',
                'Visa interview coaching'
            ]
        },
        {
            icon: <Plane className="h-12 w-12" />,
            title: 'Tourist Visa',
            description: 'Hassle-free tourist visa services for your vacation plans. We make your travel dreams come true with quick processing.',
            features: [
                'Itinerary planning',
                'Hotel bookings assistance',
                'Travel insurance',
                'Quick processing'
            ]
        },
        {
            icon: <GraduationCap className="h-12 w-12" />,
            title: 'Ausbildung Visa',
            description: 'Start your vocational training journey in Germany with our expert Ausbildung visa assistance. We guide you through every step of the German apprenticeship visa process.',
            features: [
                'Training contract verification',
                'Language requirement guidance',
                'Document preparation & filing',
                'Embassy interview coaching'
            ]
        }
    ]

    const languageServices = [
        {
            icon: <BookOpen className="h-12 w-12" />,
            title: 'PTE Academic',
            description: 'Comprehensive PTE preparation with expert trainers and proven methodologies.',
            price: '₹15,000',
            duration: '8 weeks'
        },
        {
            icon: <BookOpen className="h-12 w-12" />,
            title: 'IELTS Preparation',
            description: 'Achieve your target IELTS band score with our structured training program.',
            price: '₹12,000',
            duration: '10 weeks'
        },
        {
            icon: <BookOpen className="h-12 w-12" />,
            title: 'Spoken English',
            description: 'Build confidence in English communication for personal and professional growth.',
            price: '₹8,000',
            duration: '6 weeks'
        }
    ]

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Our Services</h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                            Comprehensive visa services and English language training to help you achieve your international goals
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Visa Services Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center space-x-2 text-primary-600 font-semibold mb-4">
                            <Globe className="h-5 w-5" />
                            <span className="uppercase text-sm tracking-wider">VISA SERVICES</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Professional Visa Assistance
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Expert guidance for all types of visa applications with high success rates
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {visaServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>

                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Language Training Section */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center space-x-2 text-primary-600 font-semibold mb-4">
                            <BookOpen className="h-5 w-5" />
                            <span className="uppercase text-sm tracking-wider">LANGUAGE TRAINING</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            English Language Courses
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Expert-led courses to help you achieve your English proficiency goals
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {languageServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>

                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                                    <div>
                                        <div className="text-sm text-gray-500">Price</div>
                                        <div className="text-2xl font-bold text-primary-600">{service.price}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Duration</div>
                                        <div className="text-lg font-semibold text-gray-900">{service.duration}</div>
                                    </div>
                                </div>

                                <Link
                                    href={`/courses/${service.title.toLowerCase().replace(' ', '-')}`}
                                    className="btn-primary w-full text-center block"
                                >
                                    View Details
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Flying Horse?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Your trusted partner for visa services and language training
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                title: '25+ Years Experience',
                                description: 'Decades of expertise in visa services and language training',
                                icon: <CheckCircle className="h-8 w-8" />
                            },
                            {
                                title: 'High Success Rate',
                                description: 'Proven track record with thousands of successful applications',
                                icon: <CheckCircle className="h-8 w-8" />
                            },
                            {
                                title: 'Expert Team',
                                description: 'Certified professionals dedicated to your success',
                                icon: <Users className="h-8 w-8" />
                            },
                            {
                                title: 'Personalized Support',
                                description: 'One-on-one guidance throughout your journey',
                                icon: <Globe className="h-8 w-8" />
                            },
                            {
                                title: 'Affordable Pricing',
                                description: 'Competitive rates without compromising on quality',
                                icon: <Briefcase className="h-8 w-8" />
                            },
                            {
                                title: 'Quick Processing',
                                description: 'Fast-track services to meet your deadlines',
                                icon: <ArrowRight className="h-8 w-8" />
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center p-6"
                            >
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />

            <Footer />
        </div>
    )
}