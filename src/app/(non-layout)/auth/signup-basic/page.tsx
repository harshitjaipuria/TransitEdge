import { NextPageWithLayout } from '@src/dtos'
import Layout2 from '@src/layout/Layout2'
import SignupBasic from '@src/views/Auth/Signup/SignupBasic'
import React from 'react'

const SignUpBasicPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <SignupBasic />
    </React.Fragment>
  )
}

export default SignUpBasicPage
