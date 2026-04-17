'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, Mail } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-4xl w-full">
                <div className="text-center">
                    {/* 404 Number with Futuristic Animation */}
                    <motion.div
                        initial={{ scale: 0, rotateY: 180 }}
                        animate={{ scale: 1, rotateY: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            duration: 1
                        }}
                        className="mb-8"
                    >
                        <motion.h1
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(255,255,255,0.5)",
                                    "0 0 40px rgba(255,255,255,0.8)",
                                    "0 0 20px rgba(255,255,255,0.5)",
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-[180px] md:text-[250px] font-bold text-white leading-none"
                            style={{
                                background: 'linear-gradient(45deg, #fff, #a5f3fc, #fff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            404
                        </motion.h1>
                    </motion.div>

                    {/* Error Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Oops! The page you're looking for seems to have wandered off into the digital void.
                            Let's get you back on track.
                        </p>
                    </motion.div>

                    {/* Animated Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"
                    />

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-white/50 transition-all duration-300"
                            >
                                <Home className="h-5 w-5" />
                                <span>Back to Home</span>
                            </motion.button>
                        </Link>

                        <Link href="/courses">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
                            >
                                <Search className="h-5 w-5" />
                                <span>Browse Courses</span>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Contact Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-12"
                    >
                        <Link href="/contact" className="inline-flex items-center space-x-2 text-blue-100 hover:text-white transition-colors">
                            <Mail className="h-5 w-5" />
                            <span>Need help? Contact us</span>
                        </Link>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 left-10 opacity-20"
                    >
                        <div className="w-20 h-20 border-4 border-white rounded-lg" />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -5, 5, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute bottom-20 right-10 opacity-20"
                    >
                        <div className="w-16 h-16 border-4 border-white rounded-full" />
                    </motion.div>

                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        className="absolute top-1/2 right-20 opacity-20"
                    >
                        <div className="w-12 h-12 bg-white rounded-full" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}