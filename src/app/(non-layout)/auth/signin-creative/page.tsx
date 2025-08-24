import { NextPageWithLayout } from '@src/dtos'
import SigninCreative from '@src/views/Auth/SignIn/SigninCreative'
import React from 'react'

const SignInCreativePage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <SigninCreative />
    </React.Fragment>
  )
}

export default SignInCreativePage
