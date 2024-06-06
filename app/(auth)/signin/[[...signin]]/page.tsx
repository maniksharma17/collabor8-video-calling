import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { dark, neobrutalism } from '@clerk/themes';

const SigninPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
      <SignIn appearance={{
        baseTheme: [],
        variables: {
          colorInputBackground: "#ffffff",
          colorPrimary: "#3667b5",
          colorTextOnPrimaryBackground: "#ffffff",
          
        }
      }}></SignIn>
    </main>
  )
}

export default SigninPage