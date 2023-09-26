import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Busca de Repositorios GIT',
  description: 'Busque seus repositórios',
  keywords: ['Git'],
  openGraph: {
    images: ['http://urldaimagem.com/og.png']
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
