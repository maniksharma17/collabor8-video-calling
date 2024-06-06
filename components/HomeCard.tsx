import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

interface HomeCardInputTypes{
  title: string, 
  desc: string, 
  iconPath: string, 
  color: string, 
  handleClick: ()=>void
}

const HomeCard = ({title, desc, iconPath, color, handleClick}: HomeCardInputTypes) => {
  return (
        <Card className={`${color} border-none cursor-pointer`} onClick={handleClick}>
          <CardHeader>
            <CardTitle className='text-2xl'>{title}</CardTitle>
            <CardDescription className='text-black text-lg font-normal'>{desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image src={iconPath} alt={'new'} height={30} width={30}
            className='bg-gray-300 bg-opacity-40 rounded-lg p-1'></Image>
          </CardContent>
        </Card>
  )
}

export default HomeCard