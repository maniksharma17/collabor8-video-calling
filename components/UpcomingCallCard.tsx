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
import Link from 'next/link'
import { useToast } from './ui/use-toast'
import { Skeleton } from './ui/skeleton'

const UpcomingCallCard = ({meeting}: {meeting: Call}) => {
  const meetingLink = `http://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
  const {toast} = useToast()

  

  return (
    <Card className='max-lg:w-full bg-dark-1 text-white border-none'>
      <CardHeader>
        <CardTitle className='leading-2'>{meeting.state.custom.desc}</CardTitle>
        <CardDescription>{meeting.id}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-row gap-5'>

        <Button className='bg-blue-700 hover:bg-gray-700' onClick={()=>{
          navigator.clipboard.writeText(meetingLink)
          toast({
            title: 'The link has been Copied.',
            description: meetingLink
          })
        }}>Copy Link</Button>

        <Link href={meetingLink} passHref legacyBehavior>
          <a target='_blank'><Button className='bg-blue-700 hover:bg-gray-700' onClick={()=>{   
        }}>Start Call</Button></a>
        </Link>

      </CardContent>
      <CardFooter>
        <p className='font-semibold'>{(meeting.state.startsAt)?.toDateString()}, {(meeting.state.startsAt)?.toLocaleTimeString()}</p>
      </CardFooter>
    </Card>

  )
}

export default UpcomingCallCard