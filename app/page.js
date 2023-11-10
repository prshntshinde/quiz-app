import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <p>Home Page</p>
      <Link href="/quiz">Quiz</Link>
    </main>
  )
}


