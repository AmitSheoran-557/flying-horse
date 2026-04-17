import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Germany Visa & German Language Classes | Flying Horse Visa',
    description: 'Get expert help for Germany visa, Ausbildung, and German language courses (A1–B2). Book a free demo class today.',
    keywords: 'Germany visa, Ausbildung India, German classes A1 A2 B1 B2',
    openGraph: {
        title: 'Flying Horse Visa',
        description: 'Germany visa & German language training experts',
        image: 'https://flyinghorsevisa.com/preview.jpg',
        url: 'https://flyinghorsevisa.com',
    },
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                    <Toaster position="top-right" />
                </AuthProvider>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXX');
                    `}
                </Script>
            </body>
        </html>
    )
}