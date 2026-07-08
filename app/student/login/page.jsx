'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { ArrowLeft, LogIn } from 'lucide-react'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase'

export default function StudentLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        if (!isFirebaseConfigured) {
            toast.error('Firebase environment variables are not configured.')
            return
        }

        setLoading(true)
        try {
            const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
            const userDoc = await getDoc(doc(db, 'users', credential.user.uid))

            if (!userDoc.exists() || userDoc.data()?.role !== 'student') {
                await auth.signOut()
                toast.error('Only student accounts can access this dashboard.')
                return
            }

            toast.success('Welcome back.')
            router.push('/student/dashboard')
        } catch (error) {
            toast.error(error?.message || 'Login failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <Link href="/" className="inline-flex items-center text-sm font-semibold text-primary-700">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
                </Link>
                <div className="mt-6">
                    <LogIn className="h-10 w-10 text-primary-600" />
                    <h1 className="mt-4 text-3xl font-bold text-gray-950">Student Login</h1>
                    <p className="mt-2 text-gray-600">Sign in to view your payment status and unlocked lessons.</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-700">Email</span>
                        <input type="email" className="input-field mt-1" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </label>
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-700">Password</span>
                        <input type="password" className="input-field mt-1" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    </label>
                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70">
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-5 text-center text-sm text-gray-600">
                    New student? <Link href="/subscribe" className="font-semibold text-primary-700">Subscribe now</Link>
                </p>
            </div>
        </main>
    )
}
