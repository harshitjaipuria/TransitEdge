import { NextPageWithLayout } from '@src/dtos'
import SigninModern from '@src/views/Auth/SignIn/SigninModern'
import React from 'react'

const SignInModernPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <SigninModern />
    </React.Fragment>
  )
}

export default SignInModernPage
