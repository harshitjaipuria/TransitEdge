import { NextPageWithLayout } from '@src/dtos'
import SignupModern from '@src/views/Auth/Signup/SignupModern'
import React from 'react'

const SignUpModernPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <SignupModern />
    </React.Fragment>
  )
}

export default SignUpModernPage
