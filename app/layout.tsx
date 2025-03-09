import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zexu Art',
  description: 'Art portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div style={{ 
          position: 'fixed', 
          bottom: 0, 
          width: '100%', 
          textAlign: 'center', 
          padding: '1rem',
          backgroundColor: 'white',
          borderTop: '1px solid #eaeaea'
        }}>
          <a 
            href="http://beian.miit.gov.cn" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#666', textDecoration: 'none' }}
          >
            浙ICP备2025155005号
          </a>
        </div>
      </body>
    </html>
  )
} 