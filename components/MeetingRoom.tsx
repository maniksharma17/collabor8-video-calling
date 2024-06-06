"use client"
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React ,{useState} from 'react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import EndCallButton from './EndCallButton'
import { Button } from './ui/button'

const MeetingRoom = ({camMode, micMode}: {camMode: boolean, micMode: boolean}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const call = useCall()

  const [layout, setLayout] = useState<'grid'|'speaker-view'|'mobile'>("speaker-view")
  const [showParticipants, setShowParticipants] = useState(false)
  const isPrivate = !!searchParams.get('private')

  if(!camMode) call?.camera.disable()
  if(!micMode) call?.microphone.disable()

  const CallLayout = ()=>{
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout/>
      case 'mobile':
        return <PaginatedGridLayout/>
      case 'speaker-view':
        return <SpeakerLayout participantsBarPosition={'bottom'}/>
  }
}


  return (
    <section className='relative h-screen w-screen overflow-hidden pt-4 text-white'>
      
      <div className='relative size-full items-center justify-center'>

        <div className={cn('hidden ml-2 fixed right-5 top-5 bg-dark-1 p-5 rounded-lg z-50', {'flex': showParticipants})}>
          <CallParticipantsList onClose={()=>{setShowParticipants(false)}}/>
        </div>

        <div className='max-sm:flex max-sm:items-center max-sm:h-full mt-0 w-full max-w-[1000px] p-5'>
          <CallLayout></CallLayout>
        </div>
        
      </div>

      <div className='fixed bottom-0 left-0 right-0 max-sm:pb-5 flex-center gap-5 m-auto flex-wrap bg-dark-1 bg-opacity-100'>
        <CallControls onLeave={()=>{router.push('/')}}/>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className='bg-blue-800 rounded cursor-pointer hover:bg-gray-700'>
            {layout.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-dark-2 text-white ml-20 mb-2 border-1 border-gray-400 border rounded-md'>
            <DropdownMenuItem onClick={()=>{setLayout('grid')}}>Grid</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{setLayout('speaker-view')}}>Speaker View</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{setLayout('mobile')}}>Mobile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className='bg-blue-800 rounded cursor-pointer hover:bg-gray-700'
        onClick={()=>{
          setShowParticipants((prev)=>!prev)
        }}>
        Show Members</Button>

        {isPrivate && <EndCallButton></EndCallButton>}
      </div>
      
    </section>

    
  )
}

export default MeetingRoom