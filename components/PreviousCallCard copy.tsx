import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Call } from '@stream-io/video-react-sdk'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const PreviousCallCard = ({meeting}: {meeting: Call}) => {
  const meetingLink = `http://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
  
  return (
    <Card className='max-lg:w-full bg-dark-1 text-white border-none'>
      <CardHeader>
        <CardTitle className='leading-2'>{meeting.state.custom.desc}</CardTitle>
        <CardDescription>{meeting.id}</CardDescription>
      </CardHeader>
      
      <CardFooter>
        <p className='font-semibold'>{(meeting.state.startsAt)?.toDateString()}, {(meeting.state.startsAt)?.toLocaleTimeString()}</p>
      </CardFooter>
    </Card>

  )
}

export default PreviousCallCard