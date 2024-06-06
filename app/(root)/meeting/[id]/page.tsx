"use client"
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React from 'react'
import { useGetCallById } from '@/hooks/useGetCallById'
import { Loader } from '@/components/Loader'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser()
  const [ isSetupComplete, setIsSetupComplete ] = useState(false)
  const { call, isCallLoading } = useGetCallById(id)
  const [ camMode, setCamMode ] = useState(false)
  const [ micMode, setMicMode ] = useState(false)
  
  if(!isLoaded || isCallLoading) return <Loader></Loader>

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {(!isSetupComplete)?
          <MeetingSetup setIsSetupComplete={setIsSetupComplete} setCamMode={setCamMode} setMicMode={setMicMode}
          camMode={camMode} micMode={micMode}/>:
          <MeetingRoom camMode={camMode} micMode={micMode}/>}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting