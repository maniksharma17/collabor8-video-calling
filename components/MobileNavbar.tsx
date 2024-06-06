"use client"
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import path from 'path'

const MobileNavbar = () => {
  const pathname = usePathname()
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger>
          <Image src={'/icons/hamburger.svg'} alt={'menu'} width={32} height={32}
          className='bg-transparent sm:hidden pt-1'></Image>
        </SheetTrigger>
        <SheetContent className='bg-dark-2 pl-5 w-[264px] border-none' side={'left'}>
          <SheetHeader>
            <SheetDescription>
            <Link href={'/'} className='flex-row flex gap-2 items-center'>
              <Image src={'/icons/logo.svg'} alt={'Logo'} width={30} height={30}></Image>
              <p className='text-[24px] font-normal text-white'>Collabor8</p>
            </Link>

            <section className='sticky left-0 top-0 flex flex-col h-screen w-fit pt-10 text-white bg-dark-2'>

              <div className='flex flex-1 flex-col gap-4'>
                  {sidebarLinks.map((link) => {
                      const isActive = (pathname === link.route) || pathname.startsWith(`${link.route}/`);
                      return (

                        <SheetClose asChild key={link.route}>
                          <Link href={link.route} key={link.label}
                          className={cn('flex gap-3 items-center align-left px-4 py-3 rounded-lg justify-start', {
                            'bg-blue-1': isActive,
                          })}>
                            <Image src={link.imgUrl} alt={link.label} width={24} height={24}/>
                            <p className='font-light text-md'>{link.label}</p>
                          </Link>
                        </SheetClose>
                      )
                  })}
              </div>
            </section>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

    </section>
  )
}

export default MobileNavbar