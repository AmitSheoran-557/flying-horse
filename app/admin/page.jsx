import Link from 'next/link'
import { ArrowRight, CreditCard, Settings } from 'lucide-react'

export default function AdminHomePage() {
    return (
        <main className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-950">Dashboard</h1>
                <p className="mt-2 text-slate-600">Manage LMS content, students, payments, and website settings.</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Link href="/admin/settings" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary-300">
                        <Settings className="h-8 w-8 text-primary-600" />
                        <h2 className="mt-4 text-xl font-bold text-gray-950">Payment Settings</h2>
                        <p className="mt-2 text-slate-600">Update UPI, bank account number, IFSC, and payment instructions.</p>
                        <span className="mt-4 inline-flex items-center font-semibold text-primary-700">
                            Open settings <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    </Link>

                    <Link href="/admin/bank-account" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary-300">
                        <CreditCard className="h-8 w-8 text-primary-600" />
                        <h2 className="mt-4 text-xl font-bold text-gray-950">Bank Account</h2>
                        <p className="mt-2 text-slate-600">Add, edit, or delete saved bank account records.</p>
                        <span className="mt-4 inline-flex items-center font-semibold text-primary-700">
                            Manage accounts <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    )
}
