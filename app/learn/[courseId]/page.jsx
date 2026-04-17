'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Lock, CheckCircle, Clock, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/layout/Header'
import toast from 'react-hot-toast'

export default function LearnPage() {
    const params = useParams()
    const router = useRouter()
    const { user, loading } = useAuth()
    const [currentLesson, setCurrentLesson] = useState(null)
    const [courseData, setCourseData] = useState([])
    const [courseTitle, setCourseTitle] = useState('')
    const [enrollmentDate, setEnrollmentDate] = useState(new Date())

    const courseId = params.courseId

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login')
            return
        }

        if (user) {
            // Mock enrollment date (in real app, fetch from database)
            setEnrollmentDate(new Date('2024-01-15'))

            // Generate course content based on courseId
            generateCourseContent()
        }
    }, [user, loading, router, courseId])

    const generateCourseContent = () => {
        const courseTitles = {
            'pte': 'PTE Academic',
            'ielts': 'IELTS Preparation',
            'spoken-english': 'Spoken English'
        }

        setCourseTitle(courseTitles[courseId] || 'Course')

        // Mock course structure with lessons
        const mockWeeks = [
            {
                week: 1,
                title: 'Foundation',
                lessons: [
                    {
                        id: '1-1',
                        title: 'Course Introduction',
                        duration: '15:30',
                        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                        isCompleted: true,
                        isLocked: false,
                        dayNumber: 1,
                        description: 'Welcome to the course! Learn about the structure and what to expect.'
                    },
                    {
                        id: '1-2',
                        title: 'Basic Concepts',
                        duration: '22:45',
                        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
                        isCompleted: true,
                        isLocked: false,
                        dayNumber: 2,
                        description: 'Understanding the fundamental concepts you need to know.'
                    },
                    {
                        id: '1-3',
                        title: 'Practice Session 1',
                        duration: '18:20',
                        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                        isCompleted: false,
                        isLocked: false,
                        dayNumber: 3,
                        description: 'Your first hands-on practice session.'
                    },
                    {
                        id: '1-4',
                        title: 'Assessment & Feedback',
                        duration: '12:15',
                        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                        isCompleted: false,
                        isLocked: true,
                        dayNumber: 4,
                        description: 'Review your progress and get personalized feedback.'
                    }
                ]
            },
            {
                week: 2,
                title: 'Intermediate Skills',
                lessons: [
                    {
                        id: '2-1',
                        title: 'Advanced Techniques',
                        duration: '25:10',
                        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
                        isCompleted: false,
                        isLocked: true,
                        dayNumber: 5,
                        description: 'Learn advanced techniques to improve your skills.'
                    },
                    {
                        id: '2-2',
                        title: 'Practice Session 2',
                        duration: '20:30',
                        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                        isCompleted: false,
                        isLocked: true,
                        dayNumber: 6,
                        description: 'Apply the advanced techniques in practice.'
                    }
                ]
            }
        ]

        // Calculate which lessons should be unlocked based on enrollment date
        const today = new Date()
        const daysSinceEnrollment = Math.floor((today.getTime() - enrollmentDate.getTime()) / (1000 * 60 * 60 * 24))

        mockWeeks.forEach(week => {
            week.lessons.forEach(lesson => {
                lesson.isLocked = lesson.dayNumber > daysSinceEnrollment + 1
            })
        })

        setCourseData(mockWeeks)

        // Set first available lesson as current
        const firstAvailableLesson = mockWeeks
            .flatMap(week => week.lessons)
            .find(lesson => !lesson.isLocked && !lesson.isCompleted)

        if (firstAvailableLesson) {
            setCurrentLesson(firstAvailableLesson)
        } else {
            setCurrentLesson(mockWeeks[0].lessons[0])
        }
    }

    const handleLessonSelect = (lesson) => {
        if (lesson.isLocked) {
            const daysUntilUnlock = lesson.dayNumber - Math.floor((new Date().getTime() - enrollmentDate.getTime()) / (1000 * 60 * 60 * 24)) - 1
            toast.error(`This lesson will be available in ${daysUntilUnlock} day(s)`)
            return
        }
        setCurrentLesson(lesson)
    }

    const markLessonComplete = () => {
        if (!currentLesson) return

        setCourseData(prev =>
            prev.map(week => ({
                ...week,
                lessons: week.lessons.map(lesson =>
                    lesson.id === currentLesson.id
                        ? { ...lesson, isCompleted: true }
                        : lesson
                )
            }))
        )

        toast.success('Lesson completed!')

        // Move to next available lesson
        const allLessons = courseData.flatMap(week => week.lessons)
        const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson.id)
        const nextLesson = allLessons[currentIndex + 1]

        if (nextLesson && !nextLesson.isLocked) {
            setCurrentLesson(nextLesson)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Course Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">{courseTitle}</h1>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Course Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Content</h2>

                            <div className="space-y-4">
                                {courseData.map((week) => (
                                    <div key={week.week}>
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Week {week.week}: {week.title}
                                        </h3>
                                        <div className="space-y-2">
                                            {week.lessons.map((lesson) => (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => handleLessonSelect(lesson)}
                                                    className={`w-full text-left p-3 rounded-lg transition-colors ${currentLesson?.id === lesson.id
                                                        ? 'bg-primary-100 border-2 border-primary-500'
                                                        : 'bg-gray-50 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        {lesson.isCompleted ? (
                                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                        ) : lesson.isLocked ? (
                                                            <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                                        ) : (
                                                            <Play className="h-5 w-5 text-primary-600 flex-shrink-0" />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-gray-900 truncate">
                                                                {lesson.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {lesson.duration}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {currentLesson ? (
                            <div className="space-y-6">
                                {/* Video Player */}
                                <div className="card overflow-hidden">
                                    <div className="aspect-video bg-black">
                                        {currentLesson.isLocked ? (
                                            <div className="h-full flex items-center justify-center text-white">
                                                <div className="text-center">
                                                    <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                                    <h3 className="text-xl font-semibold mb-2">Lesson Locked</h3>
                                                    <p className="text-gray-300">
                                                        This lesson will be available on day {currentLesson.dayNumber}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <video
                                                controls
                                                className="w-full h-full"
                                                poster="/images/video-placeholder.jpg"
                                            >
                                                <source src={currentLesson.videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                </div>

                                {/* Lesson Info */}
                                <div className="card p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {currentLesson.title}
                                        </h2>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="h-5 w-5 mr-1" />
                                                <span>{currentLesson.duration}</span>
                                            </div>
                                            {!currentLesson.isLocked && !currentLesson.isCompleted && (
                                                <button
                                                    onClick={markLessonComplete}
                                                    className="btn-primary"
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6">
                                        {currentLesson.description}
                                    </p>

                                    {/* Lesson Navigation */}
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                        <button className="flex items-center text-gray-600 hover:text-gray-900">
                                            <ArrowLeft className="h-5 w-5 mr-2" />
                                            Previous Lesson
                                        </button>
                                        <button className="flex items-center text-gray-600 hover:text-gray-900">
                                            Next Lesson
                                            <ArrowRight className="h-5 w-5 ml-2" />
                                        </button>
                                    </div>
                                </div>

                                {/* Progress Tracking */}
                                <div className="card p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
                                    <div className="space-y-4">
                                        {courseData.map((week) => {
                                            const completedLessons = week.lessons.filter(l => l.isCompleted).length
                                            const totalLessons = week.lessons.length
                                            const progress = (completedLessons / totalLessons) * 100

                                            return (
                                                <div key={week.week}>
                                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                        <span>Week {week.week}: {week.title}</span>
                                                        <span>{completedLessons}/{totalLessons} lessons</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card p-12 text-center">
                                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Select a Lesson</h2>
                                <p className="text-gray-600">
                                    Choose a lesson from the sidebar to start learning
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}