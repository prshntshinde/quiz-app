'use client';
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav>
        <Link href="/">Logo</Link>
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/quiz">Quiz</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar