import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Home Page</p>
      <Link href="/quiz">Quiz</Link>
    </main>
  )
}

export const metadata = {
  title: 'Home |',
}
