"use client"

import { useSession } from '@clerk/nextjs'
import React, {useState} from 'react'


const HomeBanner = () => {
  const [dateTime, setDatetime] = useState(new Date())
  setInterval(()=>{setDatetime(new Date())}, 1000)
  
  return (
    <div className='w-full h-[300px] relative bg-gradient-to-l from-[#434343] to-[#2c3e50] rounded-3xl'>
        <div className='flex flex-col absolute bottom-5 left-5 gap-5 px-5'>
          <h1 className='text-7xl font-semibold'>{(dateTime.getHours()==0)?"00" : dateTime.getHours()}:{(dateTime.getMinutes() < 10)? `0${dateTime.getMinutes()}`: dateTime.getMinutes()}<span className='text-xl font-light'> {(dateTime.getHours()<=12)?"AM":"PM"}</span></h1>
          <h1 className='text-7xl font-thin'>{dateTime.toDateString().split(' ')[0]}, {dateTime.toDateString().split('').splice(3)}</h1>
        </div>
        
    </div>
    
  )
}

export default HomeBanner