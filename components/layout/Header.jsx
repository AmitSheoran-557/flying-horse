'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user, logout } = useAuth()

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Courses', href: '/courses' },
        { name: 'Team', href: '/team' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ]

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '0px'
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }, [isMenuOpen])

    return (
        <>
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">FH</span>
                            </div>
                            <div>
                                <div className="font-bold text-xl text-gray-900">Flying Horse</div>
                                <div className="text-sm text-gray-600">Visa Services</div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                                    >
                                        <User className="h-5 w-5" />
                                        <span>Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/auth/login"
                                        className="text-gray-700 hover:text-primary-600 font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="btn-primary"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="h-6 w-6 text-gray-700" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="h-6 w-6 text-gray-700" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>

            {/* Backdrop for mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        style={{ top: '72px' }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Navigation - Slides from Right, Below Header */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'tween',
                            duration: 0.3,
                            ease: 'easeInOut'
                        }}
                        className="fixed right-0 w-full sm:w-96 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
                        style={{
                            top: '72px',
                            bottom: 0,
                            maxHeight: 'calc(100vh - 72px)'
                        }}
                    >
                        <div className="p-4 sm:p-6">
                            {/* Navigation Links */}
                            <nav className="space-y-1">
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium rounded-lg transition-all duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Divider */}
                            <div className="my-6 h-px bg-gray-200" />

                            {/* User Section */}
                            {user ? (
                                <div className="space-y-1">
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <User className="h-5 w-5 flex-shrink-0" />
                                        <span className="font-medium">Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout()
                                            setIsMenuOpen(false)
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                                    >
                                        <LogOut className="h-5 w-5 flex-shrink-0" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Link
                                        href="/auth/login"
                                        className="block px-4 py-3 text-center text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium rounded-lg border-2 border-gray-200 transition-all duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="block px-4 py-3 text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}

                            {/* Contact Info */}
                            <div className="mt-8 p-3 sm:p-4 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Contact Us</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">SCO 73-74, Red Square Market</p>
                                <p className="text-xs sm:text-sm text-gray-600 mb-2">Hisar, Haryana</p>
                                <a
                                    href="mailto:enquiry.flyhousevisaservices@gmail.com"
                                    className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 break-all block"
                                >
                                    enquiry.flyhousevisaservices@gmail.com
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}