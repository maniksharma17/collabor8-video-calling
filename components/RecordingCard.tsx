import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { Button } from './ui/button'
import Link from 'next/link'
import { useToast } from './ui/use-toast'
import { Skeleton } from './ui/skeleton'

const RecordingCard = ({meeting}: {meeting: CallRecording}) => {
  const meetingLink = `http://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
  const {toast} = useToast()

  

  return (
    <Card className='max-lg:w-full bg-dark-1 text-white border-none'>
      <CardHeader>
        <CardTitle className='leading-2'>{meeting.filename}</CardTitle>
        <CardDescription>{(meeting.start_time)}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-row gap-5'>

        <Button className='bg-blue-700 hover:bg-gray-700' onClick={()=>{
          navigator.clipboard.writeText(meeting.url)
          toast({
            title: 'The link has been Copied.',
            description: meeting.url
          })
        }}>Copy Link</Button>

        <Link href={meeting.url} passHref legacyBehavior>
          <a target='_blank'><Button className='bg-blue-700 hover:bg-gray-700' onClick={()=>{   
        }}>Play Recording</Button></a>
        </Link>

      </CardContent>
      
    </Card>

  )
}

export default RecordingCard