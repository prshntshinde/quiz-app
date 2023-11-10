'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Homepage', href: '/' },
        { label: 'Quiz', href: '/quiz' }
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center font-bold'>
            <Link href="/">Logo</Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <Link
                        key={link.href}
                        className={`${link.href === currentPath ? 'text-zinc-950' : 'text-zinc-500'} hover:text-zinc-900 transition-colors`}
                        href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    )
}

export default NavBar