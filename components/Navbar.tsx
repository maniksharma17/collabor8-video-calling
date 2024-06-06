import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileNavbar from './MobileNavbar'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-screen bg-dark-1 px-6 py-4 lg:px-10 border-b border-gray-800'>

      <Link href={'/'} className='flex-row flex gap-4 items-center'>
        <Image src={'/icons/logo.svg'} alt={'Logo'} width={36} height={36}></Image>
        <p className='text-[28px] font-semibold text-white max-sm:hidden'>Collabor8</p>
      </Link>
      
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />  
        </SignedIn>

        <MobileNavbar></MobileNavbar>
      </div>
      
    </nav>
  )
}

export default Navbar