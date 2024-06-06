"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useCall, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useRouter } from 'next/navigation'

const Table = ({title, description}: {title: string, description: string})=>{
  return <div className='flex flex-col xl:flex-row gap-2 xl:items-center'>
    <h1 className='text-gray-400 text-xl font-semibold'>{title}: </h1>
    <h1 className='text-xl font-thin'>{description}</h1>
  </div>
}



const PrivatePage = () => {
  const {user} = useUser()
  const meetingId = user?.id
  const meetingLink = `http://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}/?private=true`
  const {toast} = useToast()

  const {call} = useGetCallById(meetingId as string)
  const client = useStreamVideoClient()
  const router = useRouter()

  const startsAt = new Date().toISOString()

  const startRoom = async () => {
    if(!client || !user) return
    const newCall = client.call('default', meetingId as string)

    if(!call){
      await newCall?.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            desc: 'Private Meeting'
          }
        }
      })
    }

    router.push(meetingLink)

  }

  return (
    <section className='flex flex-col gap-10 text-white size-full'>
    <h1 className='text-3xl font-bold'>Private Room</h1>
    <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
      <Table title='Name' description={`${user?.fullName as string}'s Meeting Room`}></Table>
      <Table title='Meeting ID' description={meetingId!}></Table>
    </div>
    <div className='flex gap-5'>
      
      <Button className='bg-blue-800 hover:bg-gray-700'
      onClick={startRoom}>Start Private Meeting</Button>

      <Button className='bg-blue-800 hover:bg-gray-700'
      onClick={()=>{
        navigator.clipboard.writeText(meetingLink)
        toast({
          title: 'Link has been copied!',
          description: meetingLink
        })
      }}>Copy Invitation Link</Button>
    </div>
  </section>
  )
}

export default PrivatePage