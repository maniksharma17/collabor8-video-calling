"use client"
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import React from 'react'
import { useState, useEffect } from 'react'
import UpcomingCallCard from './UpcomingCallCard'
import PreviousCallCard from './PreviousCallCard copy'
import { Loader, SkeletonCards } from './Loader'
import { Skeleton } from "@/components/ui/skeleton"
import RecordingCard from './RecordingCard'

interface CallListInputTypes{
  type: 'ended'|'upcoming'|'recording'
}

const CallList = ({type}: CallListInputTypes) => {
  const { isLoading, endedCalls, upcomingCalls, recordings } = useGetCalls()
  const [ recordingList, setRecordingList ] = useState<CallRecording[]>([])

  console.log(recordings)


  const getCalls = ()=>{
    switch(type){
      case 'ended':
        return endedCalls
      case 'recording':
        return recordings
      case 'upcoming':
        return upcomingCalls
    }
  }

  const getCallsMessage = ()=>{
    switch(type){
      case 'ended':
        return 'No Previous Calls'
      case 'recording':
        return 'No Recordings'
      case 'upcoming':
        return 'No upcoming Calls'
    }
  }

  useEffect(()=>{
    const fetchRecordings = async ()=>{
      const callData = await Promise.all(recordings.map((meeting) => meeting.queryRecordings()))
      const recData = callData.filter(call => call.recordings.length>0).flatMap(call => call.recordings)

      setRecordingList(recData)
      console.log(recData)
    }
    if(type==='recording') fetchRecordings()
  }, [type, recordings])

  const calls = getCalls()
  const noCallResponse = getCallsMessage()

  
  
  if(isLoading) {
    return <SkeletonCards></SkeletonCards>
  }

  if(calls?.length<1) return <p>{noCallResponse}</p>
  
    
  switch(type){
    case 'upcoming':
      return (
        <div className='grid gap-5 grid-cols-2 max-lg:grid-cols-1'>
          {calls && calls.map((meeting: Call)=>{
            return <UpcomingCallCard meeting={meeting} key={meeting.id}></UpcomingCallCard>
          })}
        </div>
      )
    
    case 'ended':
      return (
        <div className='grid gap-5 grid-cols-2 max-lg:grid-cols-1'>
          {calls && calls.map((meeting: Call)=>{
            return <PreviousCallCard meeting={meeting} key={meeting.id}></PreviousCallCard>
          })}
        </div>
      )
    
    case 'recording':
      return (
        <div className='grid gap-5 grid-cols-2 max-lg:grid-cols-1'>
          {recordingList && recordingList.map((meeting: CallRecording)=>{
            return <RecordingCard meeting={meeting} key={meeting.filename}></RecordingCard>
          })}
        </div>
      )
  }
  
}

export default CallList