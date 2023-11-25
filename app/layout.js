import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import HomeImage from './components/HomeImage'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home | Quiz App',
  description: 'This is a Quiz App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
