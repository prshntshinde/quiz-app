import Image from 'next/image'
import Link from 'next/link'
import NavBar from './components/NavBar'

export default function Home() {
  return (
    <main>
      <p>Home Page</p>
      <Link href="/quiz">Quiz</Link>
      <NavBar/>
    </main>
  )
}


