'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 90, 180, 270, 360],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/3 left-1/3 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        rotate: [360, 270, 180, 90, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-red-300 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-3xl w-full">
                <div className="text-center">
                    {/* Error Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            duration: 1
                        }}
                        className="mb-8 flex justify-center"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <AlertTriangle className="h-16 w-16 text-red-600" />
                            </div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                                className="absolute inset-0 border-4 border-white rounded-full"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Error Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
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
                            className="text-5xl md:text-6xl font-bold text-white mb-4"
                        >
                            Oops! Something Went Wrong
                        </motion.h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
                        </p>
                    </motion.div>

                    {/* Error Details (Optional) */}
                    {error.message && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 max-w-xl mx-auto"
                        >
                            <p className="text-sm text-white/80 font-mono break-words">
                                {error.message}
                            </p>
                        </motion.div>
                    )}

                    {/* Animated Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"
                    />

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.button
                            onClick={reset}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-white/50 transition-all duration-300"
                        >
                            <RefreshCw className="h-5 w-5" />
                            <span>Try Again</span>
                        </motion.button>

                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
                            >
                                <Home className="h-5 w-5" />
                                <span>Go Home</span>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 left-10 opacity-20"
                    >
                        <AlertTriangle className="h-12 w-12 text-white" />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                            x: [0, -20, 0],
                            rotate: [360, 180, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute bottom-20 right-10 opacity-20"
                    >
                        <div className="w-16 h-16 border-4 border-white rounded-lg" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}