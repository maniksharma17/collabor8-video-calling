"use client"
import React, {useState} from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea'
import { Label } from '@radix-ui/react-label'
import ReactDatePicker from 'react-datepicker'


const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'instantMeeting' | 'joiningMeeting' | 'schedulingMeeting' | undefined>()
  const { user } = useUser();
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    desc: '',
    link: ''
  })
  
  const [callDetails, setCallDetails] = useState<Call>()
  console.log(callDetails)
  const router = useRouter()
  const { toast } = useToast()
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  const [ joinLink, setJoinLink ] = useState('')

  const createMeeting = async ()=>{
    if(!user || !client) return

    try{
      if(!values.dateTime){
        toast({
          variant: 'destructive',
          title: 'Select a date and time.'
        })
      }

      const callId = crypto.randomUUID()
      const callType = 'default'
      
      const call = client.call(callType, callId)
      if(!call) throw new Error('Failed to create Call')
      console.log(call)
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()

      const desc = values.desc || 'Instant Meeting.'
      
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            desc
          }
        }
      })
      setCallDetails(call)
      
      if(meetingState==='instantMeeting'){
        router.push(`/meeting/${call.id}`)
        toast({
          title: "Meeting Room Created",
          description: "Room ID: " + call.id,
        })
        
      } 
    }
    catch(e){
      console.log(e)
      toast({
        variant: 'destructive',
        title: "Failed!",
        description: "Some error has occured.",
      })
    }
  }


  return (
    <div className='grid grid-cols-2 h-fit gap-5 max-md:grid-cols-1'>
      <HomeCard title='Create a meeting' desc='Start an instant meeting' iconPath='/icons/new.svg' color='bg-orange-600' handleClick={()=>setMeetingState('instantMeeting')}></HomeCard>
      <HomeCard title='Join meeting' desc='Join via invitation link' iconPath='/icons/join.svg' color='bg-blue-600' handleClick={()=>setMeetingState('joiningMeeting')}></HomeCard>
      <HomeCard title='Schedule a meeting' desc='Plan your meeting' iconPath='/icons/schedule.svg' color='bg-green-700' handleClick={()=>setMeetingState('schedulingMeeting')}></HomeCard>
      <HomeCard title='See Recordings' desc='View previous recordings' iconPath='/icons/video.svg' color='bg-yellow-600' handleClick={()=>setMeetingState(undefined)}></HomeCard>

      <MeetingModal 
        isOpen={meetingState==='instantMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title={'Start Instant Meeting'}
        className={'text-center'}
        buttonText={'Create Meeting'}
        handleClick={createMeeting}>
      </MeetingModal>

      {!callDetails ? (
        <MeetingModal 
        isOpen={meetingState==='schedulingMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title={'Schedule Upcoming Meeting'}
        buttonText='Schedule'
        className={'text-center'}
        handleClick={createMeeting}>
        
        <div className='flex flex-col gap-2'>
          <label className='m-0'>
          Description
          </label>
          <Textarea onChange={(e)=>{
            setValues({...values, desc: e.target.value})
          }}
          className='text-white p-1 border-none outline-none bg-gray-700 m-0'></Textarea>
        </div>

        <div className='flex flex-col gap-2'>
          <Label className='m-0'>
          Pick Date and Time
          </Label>
          <ReactDatePicker
          selected={values.dateTime}

          onChange={(date)=>{
            setValues({...values, dateTime: date! })
          }}
          showTimeSelect
          timeFormat='hh:mm'
          timeIntervals={15}
          timeCaption='Time'
          dateFormat='MMMM d, yyyy hh:mm aa'
          className='w-full rounded bg-gray-700 p-1 outline-none'
          ></ReactDatePicker>
        </div>
        
      </MeetingModal>
      ): (
        <MeetingModal 
        isOpen={meetingState==='schedulingMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title={'Meeting Scheduled'}
        className={'text-center'}
        buttonText={'Copy Link'}
        handleClick={()=>{
          navigator.clipboard.writeText(meetingLink)
          toast({title: 'Link Copied'})
        }}>
      </MeetingModal>
      )}

      <MeetingModal 
        isOpen={meetingState==='joiningMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title={'Join new meeting via Link'}
        className={'text-center'}
        buttonText={'Join Meeting'}
        handleClick={()=>{
          router.push(joinLink)
        }}>
        
          <input type='text' onChange={(e)=>{setJoinLink(e.target.value)}} placeholder='Paste link here' className='bg-gray-700 text-white outline-none border-none rounded p-1'></input>
        
      </MeetingModal>
      

    </div>
  )
}

export default MeetingTypeList