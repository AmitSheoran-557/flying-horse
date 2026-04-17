import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">FH</span>
                            </div>
                            <div>
                                <div className="font-bold text-xl">Flying Horse Visa Services Pvt Ltd</div>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Your trusted partner for visa services and English language training.
                            We help you achieve your international education and career goals.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-primary-400" />
                                <span className="text-gray-300">
                                    SCO 73-74, Red Square Market, Hisar, Haryana
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-primary-400" />
                                <a
                                    href="mailto:enquiry.flyhousevisaservices@gmail.com"
                                    className="text-gray-300 hover:text-primary-400 transition-colors"
                                >
                                    enquiry.flyhousevisaservices@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/team" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Our Team
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/login" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Our Courses</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/courses/pte" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    PTE Academic
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses/ielts" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    IELTS Preparation
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses/spoken-english" className="text-gray-300 hover:text-primary-400 transition-colors">
                                    Spoken English
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2024 Flying Horse Visa Services Pvt Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}