'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, BookOpen, CreditCard, LayoutDashboard, LogOut, Settings, Users, Video } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/lib/firebase'

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Batches', href: '/admin/batches', icon: BookOpen },
    { name: 'Videos', href: '/admin/videos', icon: Video },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }) {
    const pathname = usePathname()
    const router = useRouter()

    async function handleLogout() {
        if (isFirebaseConfigured && auth.currentUser) {
            await signOut(auth)
        }
        router.push('/student/login')
    }

    return (
        <div className="min-h-screen bg-slate-50 text-gray-950">
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-gray-200 bg-white md:block">
                <div className="flex h-16 items-center border-b border-gray-200 px-5">
                    <Link href="/admin" className="text-lg font-bold text-gray-950">
                        LMS Admin
                    </Link>
                </div>
                <nav className="space-y-1 px-3 py-5">
                    {navItems.map((item) => {
                        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${active ? 'bg-gray-950 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-gray-950'}`}
                            >
                                <item.icon className="h-5 w-5 flex-none" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            <div className="md:pl-72">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
                    <div>
                        <p className="font-bold text-gray-950">Admin Panel</p>
                        <p className="text-xs text-slate-500">{auth?.currentUser?.email || 'Admin'}</p>
                    </div>
                    <button onClick={handleLogout} className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50">
                        <LogOut className="mr-2 h-5 w-5" /> Logout
                    </button>
                </header>

                {children}
            </div>
        </div>
    )
}
