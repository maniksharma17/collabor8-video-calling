import HomeBanner from '@/components/HomeBanner'
import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'
const Home = () => {

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <HomeBanner></HomeBanner>
      <MeetingTypeList></MeetingTypeList>
      
    </section>
  )
}

export default Home