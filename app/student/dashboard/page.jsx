'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { BookOpen, CreditCard, LogOut, PlayCircle, ShieldAlert, UserRound } from 'lucide-react'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase'
import { usePaymentSettings } from '@/hooks/usePaymentSettings'

function cleanValue(value) {
    if (value === undefined || value === null) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'number' || typeof value === 'boolean') return String(value)
    if (value?.toDate) return value.toDate().toLocaleString()
    if (Array.isArray(value)) return value.filter((item) => item !== undefined && item !== null && item !== '').join(', ')
    return ''
}

function getMillis(value) {
    if (!value) return 0
    if (value.toMillis) return value.toMillis()
    if (value.toDate) return value.toDate().getTime()
    const parsed = new Date(value).getTime()
    return Number.isNaN(parsed) ? 0 : parsed
}

function getVideoSource(rawUrl) {
    const url = cleanValue(rawUrl).trim()
    if (!url) return null

    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return {
            type: 'embed',
            src: `https://www.youtube.com/embed/${url}`,
        }
    }

    try {
        const parsedUrl = new URL(url)
        const host = parsedUrl.hostname.replace(/^www\./, '')
        const pathname = parsedUrl.pathname

        if (host === 'youtube.com' || host === 'm.youtube.com') {
            const videoId = parsedUrl.searchParams.get('v') || pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1]
            if (videoId) {
                return {
                    type: 'embed',
                    src: `https://www.youtube.com/embed/${videoId}`,
                }
            }
        }

        if (host === 'youtu.be') {
            const videoId = pathname.split('/').filter(Boolean)[0]
            if (videoId) {
                return {
                    type: 'embed',
                    src: `https://www.youtube.com/embed/${videoId}`,
                }
            }
        }

        if (host === 'vimeo.com' || host === 'player.vimeo.com') {
            const videoId = pathname.split('/').filter(Boolean).pop()
            if (videoId) {
                return {
                    type: 'embed',
                    src: `https://player.vimeo.com/video/${videoId}`,
                }
            }
        }

        if (host === 'drive.google.com') {
            const fileId = pathname.match(/\/file\/d\/([^/]+)/)?.[1] || parsedUrl.searchParams.get('id')
            if (fileId) {
                return {
                    type: 'embed',
                    src: `https://drive.google.com/file/d/${fileId}/preview`,
                }
            }
        }

        if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
            return {
                type: 'direct',
                src: url,
            }
        }

        return {
            type: 'link',
            src: url,
        }
    } catch (error) {
        return {
            type: 'link',
            src: url,
        }
    }
}

function VideoPlayer({ url, title }) {
    const source = getVideoSource(url)

    if (!source) {
        return (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-gray-500">
                Video URL missing
            </div>
        )
    }

    if (source.type === 'embed') {
        return (
            <iframe
                className="aspect-video w-full rounded-lg bg-black"
                src={source.src}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        )
    }

    if (source.type === 'direct') {
        return (
            <video className="aspect-video w-full rounded-lg bg-black" controls preload="metadata">
                <source src={source.src} />
                Your browser does not support the video tag.
            </video>
        )
    }

    return (
        <div className="flex aspect-video flex-col items-center justify-center rounded-lg bg-slate-100 p-4 text-center">
            <PlayCircle className="h-8 w-8 text-primary-600" />
            <p className="mt-2 text-sm text-gray-600">This video host cannot be embedded.</p>
            <a href={source.src} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700">
                Open Video
            </a>
        </div>
    )
}

function getVideoUrl(video) {
    return video.videoUrl
        || video.url
        || video.link
        || video.youtubeUrl
        || video.youtubeLink
        || video.youtubeVideoUrl
        || video.youtubeVideoLink
        || video.youtubeId
        || video.youtubeVideoId
        || video.videoId
        || video.video
        || video.src
        || ''
}

export default function StudentDashboardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [student, setStudent] = useState(null)
    const [batch, setBatch] = useState(null)
    const [subscription, setSubscription] = useState(null)
    const { paymentSettings } = usePaymentSettings()
    const [videos, setVideos] = useState([])

    const canViewVideos = student?.paymentStatus === 'Approved' && student?.accountStatus === 'Active'

    const statusMessage = useMemo(() => {
        if (!student) return ''
        if (student.paymentStatus === 'Pending') return 'Your payment is under review.'
        if (student.paymentStatus === 'Rejected') return cleanValue(student.adminRemark || student.paymentRemark) || 'Your payment was rejected. Please contact admin.'
        if (student.accountStatus === 'Blocked') return 'Your account is not active.'
        return ''
    }, [student])

    const studentFields = useMemo(() => {
        if (!student) return []

        return Object.entries(student)
            .filter(([key]) => !['id'].includes(key))
            .map(([key, value]) => ({
                key,
                label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase()),
                value: cleanValue(value),
            }))
    }, [student])

    useEffect(() => {
        if (!isFirebaseConfigured) {
            setLoading(false)
            return
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push('/student/login')
                return
            }

            try {
                const [userDoc, studentDoc] = await Promise.all([
                    getDoc(doc(db, 'users', user.uid)),
                    getDoc(doc(db, 'students', user.uid)),
                ])

                if (!userDoc.exists() || userDoc.data()?.role !== 'student') {
                    await signOut(auth)
                    toast.error('Only student accounts can access this dashboard.')
                    router.push('/student/login')
                    return
                }

                const studentData = studentDoc.exists()
                    ? { id: studentDoc.id, ...studentDoc.data() }
                    : { id: user.uid, email: user.email || '', name: user.displayName || '' }
                setStudent(studentData)
                const batchRequest = studentData.batchId
                    ? getDoc(doc(db, 'batches', studentData.batchId))
                    : Promise.resolve(null)
                const paymentsQuery = query(collection(db, 'paymentRequests'), where('studentId', '==', user.uid))

                if (studentData.paymentStatus === 'Approved' && studentData.accountStatus === 'Active') {
                    const batchVideosRequest = studentData.batchId
                        ? getDocs(query(collection(db, 'videos'), where('batchId', '==', studentData.batchId)))
                        : Promise.resolve({ docs: [] })
                    const studentVideosQuery = query(collection(db, 'videos'), where('studentId', '==', user.uid))
                    const [batchDoc, batchVideosSnapshot, studentVideosSnapshot, paymentsSnapshot] = await Promise.all([
                        batchRequest,
                        batchVideosRequest,
                        getDocs(studentVideosQuery),
                        getDocs(paymentsQuery),
                    ])

                    if (batchDoc?.exists()) {
                        setBatch({ id: batchDoc.id, ...batchDoc.data() })
                    } else {
                        setBatch(null)
                    }

                    const paymentRequests = paymentsSnapshot.docs
                        .map((item) => ({ id: item.id, ...item.data() }))
                        .sort((first, second) => getMillis(second.updatedAt || second.createdAt) - getMillis(first.updatedAt || first.createdAt))
                    setSubscription(paymentRequests[0] || null)

                    const videoMap = new Map()
                    batchVideosSnapshot.docs.forEach((item) => videoMap.set(item.id, { id: item.id, ...item.data() }))
                    studentVideosSnapshot.docs.forEach((item) => videoMap.set(item.id, { id: item.id, ...item.data() }))
                    setVideos(Array.from(videoMap.values()))
                } else {
                    const [batchDoc, paymentsSnapshot] = await Promise.all([
                        batchRequest,
                        getDocs(paymentsQuery),
                    ])
                    const paymentRequests = paymentsSnapshot.docs
                        .map((item) => ({ id: item.id, ...item.data() }))
                        .sort((first, second) => getMillis(second.updatedAt || second.createdAt) - getMillis(first.updatedAt || first.createdAt))

                    setBatch(batchDoc?.exists() ? { id: batchDoc.id, ...batchDoc.data() } : null)
                    setSubscription(paymentRequests[0] || null)
                    setVideos([])
                }
            } catch (error) {
                toast.error('Could not load dashboard.')
            } finally {
                setLoading(false)
            }
        })

        return () => unsubscribe()
    }, [router])

    useEffect(() => {
        if (!isFirebaseConfigured || !student?.id) return undefined

        const unsubscribeStudent = onSnapshot(doc(db, 'students', student.id), (snapshot) => {
            if (!snapshot.exists()) return
            setStudent((current) => ({
                ...(current || {}),
                id: snapshot.id,
                ...snapshot.data(),
            }))
        })

        const paymentsQuery = query(collection(db, 'paymentRequests'), where('studentId', '==', student.id))
        const unsubscribePayments = onSnapshot(paymentsQuery, (snapshot) => {
            const paymentRequests = snapshot.docs
                .map((item) => ({ id: item.id, ...item.data() }))
                .sort((first, second) => getMillis(second.updatedAt || second.createdAt) - getMillis(first.updatedAt || first.createdAt))
            setSubscription(paymentRequests[0] || null)
        })

        return () => {
            unsubscribeStudent()
            unsubscribePayments()
        }
    }, [student?.id])

    useEffect(() => {
        if (!isFirebaseConfigured || !student?.id) return undefined

        let cancelled = false

        async function loadAccessData() {
            try {
                const batchDoc = student.batchId
                    ? await getDoc(doc(db, 'batches', student.batchId))
                    : null

                if (!cancelled) {
                    setBatch(batchDoc?.exists() ? { id: batchDoc.id, ...batchDoc.data() } : null)
                }

                if (student.paymentStatus !== 'Approved' || student.accountStatus !== 'Active') {
                    if (!cancelled) setVideos([])
                    return
                }

                const batchVideosRequest = student.batchId
                    ? getDocs(query(collection(db, 'videos'), where('batchId', '==', student.batchId)))
                    : Promise.resolve({ docs: [] })
                const studentVideosQuery = query(collection(db, 'videos'), where('studentId', '==', student.id))
                const [batchVideosSnapshot, studentVideosSnapshot] = await Promise.all([
                    batchVideosRequest,
                    getDocs(studentVideosQuery),
                ])

                const videoMap = new Map()
                batchVideosSnapshot.docs.forEach((item) => videoMap.set(item.id, { id: item.id, ...item.data() }))
                studentVideosSnapshot.docs.forEach((item) => videoMap.set(item.id, { id: item.id, ...item.data() }))

                if (!cancelled) {
                    setVideos(Array.from(videoMap.values()))
                }
            } catch (error) {
                if (!cancelled) {
                    setVideos([])
                }
            }
        }

        loadAccessData()

        return () => {
            cancelled = true
        }
    }, [student?.id, student?.batchId, student?.paymentStatus, student?.accountStatus])

    async function handleLogout() {
        await signOut(auth)
        router.push('/student/login')
    }

    if (loading) {
        return <main className="flex min-h-screen items-center justify-center bg-slate-50 text-gray-700">Loading dashboard...</main>
    }

    if (!isFirebaseConfigured) {
        return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center text-gray-700">Firebase environment variables are not configured.</main>
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gray-950 p-6 text-white md:flex-row md:items-center">
                    <div>
                        <p className="text-gray-300">Student dashboard</p>
                        <h1 className="mt-1 text-3xl font-bold">Welcome, {cleanValue(student?.name)}</h1>
                    </div>
                    <button onClick={handleLogout} className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 font-semibold text-gray-950 transition hover:bg-gray-100">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                </div>

                <section className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <UserRound className="h-7 w-7 text-primary-600" />
                        <p className="mt-3 text-sm text-gray-500">Batch</p>
                        <h2 className="text-lg font-bold text-gray-950">{cleanValue(batch?.name || batch?.title || student?.batchName || student?.batchId)}</h2>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <ShieldAlert className="h-7 w-7 text-primary-600" />
                        <p className="mt-3 text-sm text-gray-500">Payment status</p>
                        <h2 className="text-lg font-bold text-gray-950">{cleanValue(student?.paymentStatus)}</h2>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <BookOpen className="h-7 w-7 text-primary-600" />
                        <p className="mt-3 text-sm text-gray-500">Account status</p>
                        <h2 className="text-lg font-bold text-gray-950">{cleanValue(student?.accountStatus)}</h2>
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-950">Student Details</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {studentFields.map((field) => (
                            <div key={field.key}>
                                <p className="text-sm text-gray-500">{field.label}</p>
                                <p className="font-semibold text-gray-950">{field.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <CreditCard className="h-7 w-7 text-primary-600" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-950">Payment Verification</h2>
                            <p className="text-sm text-gray-500">Submit only your UTR number. Screenshot upload is not required.</p>
                        </div>
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="text-sm text-gray-500">Registered A/C No</p>
                            <p className="font-semibold text-gray-950">{cleanValue(paymentSettings.accountNumber) || 'Loading...'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">IFSC</p>
                            <p className="font-semibold text-gray-950">{cleanValue(paymentSettings.ifsc) || 'Loading...'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">UPI</p>
                            <p className="font-semibold text-gray-950">{cleanValue(paymentSettings.upi) || 'Loading...'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Required Proof</p>
                            <p className="font-semibold text-gray-950">UTR number only</p>
                        </div>
                    </div>
                </section>

                {subscription || student ? (
                    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-950">Subscription Details</h2>
                        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <p className="text-sm text-gray-500">Course / Batch</p>
                                <p className="font-semibold text-gray-950">{cleanValue(subscription?.batchName || batch?.name || batch?.title || student?.batchName || student?.course)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Amount</p>
                                <p className="font-semibold text-gray-950">{cleanValue(subscription?.amount || batch?.amount || batch?.price || batch?.fee || student?.amount)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">UTR</p>
                                <p className="font-semibold text-gray-950">{cleanValue(subscription?.utrNumber || student?.utrNumber)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-semibold text-gray-950">{cleanValue(subscription?.status || student?.paymentStatus)}</p>
                            </div>
                        </div>
                    </section>
                ) : null}

                {!canViewVideos ? (
                    <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
                        <h2 className="text-xl font-bold">Access pending</h2>
                        <p className="mt-2">{statusMessage}</p>
                        <Link href="/subscribe" className="mt-4 inline-flex font-semibold text-amber-950 underline">
                            Submit another payment request
                        </Link>
                    </section>
                ) : (
                    <section className="mt-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-950">Unlocked Videos</h2>
                            <span className="text-sm font-semibold text-gray-500">{videos.length} available</span>
                        </div>
                        {videos.length ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {videos.map((video) => {
                                    const title = video.title || video.name || 'Course video'
                                    const url = getVideoUrl(video)

                                    return (
                                        <article key={video.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                            <VideoPlayer url={url} title={title} />
                                            <h3 className="mt-4 text-lg font-bold text-gray-950">{title}</h3>
                                            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{video.description || video.summary || 'Video lesson is available for your account.'}</p>
                                        </article>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-600">
                                No unlocked videos have been assigned yet.
                            </div>
                        )}
                    </section>
                )}
            </div>
        </main>
    )
}
