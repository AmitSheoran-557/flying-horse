'use client'

import { motion } from 'framer-motion'
import { Camera, Image as ImageIcon, Users, BookOpen, Award } from 'lucide-react'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState('all')

    const galleryItems = [
        // Academy Photos
        {
            id: 1,
            category: 'academy',
            title: 'Main Reception Area',
            image: '/images/gallery/academy1.jpg',
            description: 'Our welcoming reception area'
        },
        {
            id: 2,
            category: 'academy',
            title: 'Modern Classrooms',
            image: '/images/gallery/academy2.jpg',
            description: 'State-of-the-art learning facilities'
        },
        {
            id: 3,
            category: 'academy',
            title: 'Computer Lab',
            image: '/images/gallery/academy3.jpg',
            description: 'Fully equipped computer lab for PTE practice'
        },
        {
            id: 4,
            category: 'academy',
            title: 'Library & Study Area',
            image: '/images/gallery/academy4.jpg',
            description: 'Quiet space for focused learning'
        },
        {
            id: 5,
            category: 'academy',
            title: 'Consultation Rooms',
            image: '/images/gallery/academy5.jpg',
            description: 'Private consultation spaces'
        },
        {
            id: 6,
            category: 'academy',
            title: 'Student Lounge',
            image: '/images/gallery/academy6.jpg',
            description: 'Comfortable break area for students'
        },
        // Class Photos
        {
            id: 7,
            category: 'classes',
            title: 'IELTS Speaking Class',
            image: '/images/gallery/class1.jpg',
            description: 'Interactive speaking practice session'
        },
        {
            id: 8,
            category: 'classes',
            title: 'PTE Training Session',
            image: '/images/gallery/class2.jpg',
            description: 'Students practicing PTE modules'
        },
        {
            id: 9,
            category: 'classes',
            title: 'Group Discussion',
            image: '/images/gallery/class3.jpg',
            description: 'Collaborative learning environment'
        },
        {
            id: 10,
            category: 'classes',
            title: 'Writing Workshop',
            image: '/images/gallery/class4.jpg',
            description: 'Intensive writing skills development'
        },
        {
            id: 11,
            category: 'classes',
            title: 'Mock Test Session',
            image: '/images/gallery/class5.jpg',
            description: 'Students taking practice tests'
        },
        {
            id: 12,
            category: 'classes',
            title: 'One-on-One Coaching',
            image: '/images/gallery/class6.jpg',
            description: 'Personalized attention for students'
        },
        // Events & Achievements
        {
            id: 13,
            category: 'events',
            title: 'Success Celebration',
            image: '/images/gallery/event1.jpg',
            description: 'Celebrating student achievements'
        },
        {
            id: 14,
            category: 'events',
            title: 'Orientation Day',
            image: '/images/gallery/event2.jpg',
            description: 'Welcome session for new students'
        },
        {
            id: 15,
            category: 'events',
            title: 'Workshop Seminar',
            image: '/images/gallery/event3.jpg',
            description: 'Special training workshop'
        },
        {
            id: 16,
            category: 'events',
            title: 'Award Ceremony',
            image: '/images/gallery/event4.jpg',
            description: 'Recognizing top performers'
        }
    ]

    const categories = [
        { id: 'all', label: 'All Photos', icon: <ImageIcon className="h-5 w-5" /> },
        { id: 'academy', label: 'Academy', icon: <BookOpen className="h-5 w-5" /> },
        { id: 'classes', label: 'Classes', icon: <Users className="h-5 w-5" /> },
        { id: 'events', label: 'Events', icon: <Award className="h-5 w-5" /> }
    ]

    const filteredItems = activeTab === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeTab)

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center space-x-2 text-blue-100 mb-4">
                            <Camera className="h-6 w-6" />
                            <span className="uppercase text-sm tracking-wider font-semibold">Gallery</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Academy & Classes</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Take a virtual tour of our modern facilities and vibrant learning environment
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="py-8 bg-white sticky top-0 z-10 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === category.id
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.icon}
                                <span>{category.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                            const fallback = e.currentTarget.nextElementSibling
                                            if (fallback) {
                                                fallback.classList.remove('hidden')
                                                fallback.classList.add('flex')
                                            }
                                        }}
                                    />
                                    {/* Fallback */}
                                    <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
                                        <Camera className="h-16 w-16 text-white opacity-50" />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-200">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="text-xs font-semibold text-gray-900 capitalize">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-xl text-gray-600">No photos found in this category</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Classrooms', value: '4+', icon: <BookOpen className="h-8 w-8" /> },
                            { label: 'Computer Labs', value: '3', icon: <ImageIcon className="h-8 w-8" /> },
                            { label: 'Study Areas', value: '5', icon: <Users className="h-8 w-8" /> },
                            { label: 'Seating Capacity', value: '50+', icon: <Award className="h-8 w-8" /> }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full text-primary-600 mb-3">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Academy</h2>
                        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                            Experience our world-class facilities in person. Schedule a visit today!
                        </p>
                        <a
                            href="/contact"
                            className="btn-secondary inline-block"
                        >
                            Schedule a Visit
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
