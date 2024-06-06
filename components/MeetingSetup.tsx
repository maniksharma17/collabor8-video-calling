"use client"
import { VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useState, useEffect } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface MeetingSetupInputTypes{
  setIsSetupComplete: (val: boolean)=>void,
  setCamMode: (val: any)=>void,
  setMicMode: (val: any)=>void,
  camMode: boolean,
  micMode: boolean
}

const MeetingSetup = ({setIsSetupComplete, setCamMode, setMicMode, camMode, micMode}: MeetingSetupInputTypes) => {
  const call = useCall()
  

  return (
    <div className='flex min-sm:h-fit h-screen w-screen flex-col items-center justify-center gap-5 text-white'>
      <h1 className='text-4xl font-normal'>Meeting Preview</h1>

      <VideoPreview className='h-1/2 m-0 flex items-center justify-center'></VideoPreview>

      <div className='flex flex-row gap-10'>

        <div className='flex flex-col items-center gap-2'>
          <Switch id="camera-mode" onClick={()=>{
            setCamMode((c: boolean)=>!c)
            if(camMode) call?.camera.disable()
            else call?.camera.enable()
          }}/>
          <Label htmlFor="camera-mode">Camera</Label>
        </div>
        
        <div className='flex flex-col items-center gap-2'>
          <Switch id="mic-mode" onClick={()=>{
            setMicMode((c: boolean)=>!c)
          }}/>
          <Label htmlFor="mic-mode">Mic</Label>
        </div>
        
        <button onClick={()=>{
          call?.join()
          setIsSetupComplete(true)
        }} 
          className='bg-green-700 p-2 rounded-md hover:bg-opacity-80'>
          Join meeting
        </button>

      </div>

      
      
    </div>
  )
}

export default MeetingSetup