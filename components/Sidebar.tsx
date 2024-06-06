"use client"
import { sidebarLinks } from '@/constants'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const Sidebar = () => {
  const pathname = usePathname()
  
  return (
    <section className='sticky left-0 top-0 flex flex-col h-screen bg-dark-1
    w-fit p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        
        <div className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((link) => {
                const isActive = (pathname === link.route) || pathname.startsWith(`${link.route}/`);
                return (
                  <Link href={link.route} key={link.label}
                  className={cn('flex gap-3 items-center px-4 py-3 rounded-md justify-start', {
                    'bg-blue-1': isActive,
                  })}>
                    <Image src={link.imgUrl} alt={link.label} width={24} height={24}/>
                    <p className='font-semibold text-md'>{link.label}</p>
                  </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar