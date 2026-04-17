'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
    return (
        <section className="py-20 bg-primary-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of successful students who achieved their dreams with us
                    </p>
                    <Link href="/contact" className="btn-secondary">
                        Get Started Today
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}