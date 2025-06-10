import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roman Slack Portfolio',
  description: 'Personal portfolio of Roman Slack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}