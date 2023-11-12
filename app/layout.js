import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import HomeImage from './components/HomeImage'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Homepage',
  description: 'This is a Quiz App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        
        <main>{children}</main>
        </body>
    </html>
  )
}
