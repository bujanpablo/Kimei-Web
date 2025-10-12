import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kimei Cereales S.A. - 20 Años de Excelencia',
  description: 'Kimei Cereales S.A. - Líderes en comercialización de granos e insumos agrícolas. 20 años de experiencia en corretaje, mercado de futuros y administración de canjes.',
  keywords: 'cereales, granos, agricultura, futuros, MATBA, ROFEX, corretaje, canjes',
  authors: [{ name: 'Kimei Cereales S.A.' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}



