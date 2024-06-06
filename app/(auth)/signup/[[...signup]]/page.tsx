import { SignUp } from '@clerk/nextjs'
import React from 'react'
import { dark, neobrutalism } from '@clerk/themes';

const SignupPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
      <SignUp appearance={{
        baseTheme: [],
        variables: {
          colorInputBackground: "#ffffff",
          colorPrimary: "#3667b5",
          colorTextOnPrimaryBackground: "#ffffff"
        }
      }}></SignUp>
    </main>
  )
}

export default SignupPage