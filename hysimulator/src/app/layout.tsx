import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './providers/theme-provider'
import { ErrorBoundary } from './components/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hy Simulator',
  description: 'Train with professional Hyrox athlete times',
  icons: {
    icon: [
      {
        url: '/icon.ico',
        sizes: 'any',
      },
    ],
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Explicit favicon links for better browser support */}
        <link rel="icon" type="image/x-icon" href="/icon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/icon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}