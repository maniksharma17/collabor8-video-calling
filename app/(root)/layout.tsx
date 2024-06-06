import { StreamVideoProvider } from '@/providers/StreamClientProvider'
import { StreamCallProvider } from '@stream-io/video-react-sdk'
import React from 'react'

export const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
    
    
  )
}

export default RootLayout