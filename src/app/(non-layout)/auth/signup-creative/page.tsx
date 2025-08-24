import { NextPageWithLayout } from '@src/dtos'
import SignupCreative from '@src/views/Auth/Signup/SignupCreative'
import React from 'react'

const SignUpCreativePage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <SignupCreative />
    </React.Fragment>
  )
}

export default SignUpCreativePage
