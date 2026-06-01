import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const _instrumentSerif = Instrument_Serif({ weight: ["400"], subsets: ["latin"], variable: "--font-instrument-serif" });
const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: 'WritePro - AI Writing Enhancement Platform',
  description: 'Enhance your writing with AI-powered WritePro. Perfect for professionals and content creators.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark bg-background">
        <body className="font-sans antialiased">
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </body>
      </html>
    </ClerkProvider>
  )
}
