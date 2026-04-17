'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import CoursesSection from '@/components/sections/CoursesSection'
import VisaCategorySection from '@/components/sections/VisaCategorySection'
import CTASection from '@/components/sections/CTASection'
import OurServicesSection from '@/components/sections/OurServicesSection'

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 180],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [180, 90, 0],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex-1 text-center lg:text-left"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <motion.h1
                                    animate={{
                                        textShadow: [
                                            "0 0 20px rgba(255,255,255,0.3)",
                                            "0 0 40px rgba(255,255,255,0.5)",
                                            "0 0 20px rgba(255,255,255,0.3)",
                                        ]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 !leading-tight"
                                >
                                    Flying Horse Visa Services
                                </motion.h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl md:text-2xl mb-6 text-blue-100"
                            >
                                Your Gateway to Global Opportunities
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-lg mb-10 text-blue-50 max-w-2xl mx-auto lg:mx-0"
                            >
                                Professional visa services and world-class English language training.
                                Master PTE, IELTS, and Spoken English with our expert instructors.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
                            >
                                <div>
                                    <Link href="/courses" className="lg:p-3 p-2 border-white border transition-all duration-300 overflow-hidden rounded-lg hover:bg-white hover:text-blue-500 inline-flex items-center">
                                        Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/contact" className="lg:p-3 p-2 border-white border transition-all duration-300 overflow-hidden rounded-lg hover:bg-white hover:text-blue-500 inline-flex items-center">
                                        Contact Us
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Owner Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateY: 90 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="flex-1 relative"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative"
                            >
                                {/* Glowing Border Effect */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-xl opacity-50"
                                />

                                {/* Owner Image Container */}
                                <div className="relative lg:w-96 lg:h-96 w-80 h-80 mx-auto">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border-4 border-white/30 shadow-2xl overflow-hidden">
                                        {/* Owner image - Replace the src with actual image path */}
                                        <img
                                            src="https://res.cloudinary.com/dw0lrectk/image/upload/v1773469307/fl-3_hlnuo3.jpg"
                                            alt="Founder - Flying Horse Visa Services"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Fallback to placeholder if image not found
                                                e.currentTarget.style.display = 'none';
                                                const fallback = e.currentTarget.nextElementSibling;
                                                if (fallback) {
                                                    fallback.classList.remove('hidden');
                                                    fallback.classList.add('flex');
                                                }
                                            }}
                                        />
                                        {/* Fallback placeholder */}
                                        <div className="hidden absolute inset-0 w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 items-center justify-center">
                                            <Users className="h-32 w-32 text-gray-500" />
                                        </div>
                                    </div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        animate={{
                                            rotate: [0, 5, -5, 0],
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute -bottom-4 -right-4 bg-white text-primary-600 rounded-2xl p-4 shadow-2xl"
                                    >
                                        <div className="text-center">
                                            <div className="text-3xl font-bold">5+</div>
                                            <div className="text-xs font-semibold">Years</div>
                                            <div className="text-xs font-semibold">Experience</div>
                                        </div>
                                    </motion.div>

                                    {/* Orbiting Elements */}
                                    <motion.div
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center">
                                            <Star className="h-6 w-6 text-white" />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{
                                            rotate: [360, 0],
                                        }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-green-400 rounded-full shadow-lg flex items-center justify-center">
                                            <CheckCircle className="h-6 w-6 text-white" />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* Our Services Section */}
            <OurServicesSection />

            {/* Courses Section */}
            <CoursesSection />

            {/* Visa Category Section */}
            <VisaCategorySection />

            {/* CTA Section */}
            <CTASection />

            <Footer />
        </div>
    )
}