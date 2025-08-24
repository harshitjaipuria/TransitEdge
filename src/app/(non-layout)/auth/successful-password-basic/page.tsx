import { NextPageWithLayout } from '@src/dtos'
import SuccessfulPasswordBasic from '@src/views/Auth/SuccessfulPassword/SuccessfulPasswordBasic'
import React from 'react'

const SuccessfulPasswordBasicPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <SuccessfulPasswordBasic />
    </React.Fragment>
  )
}

export default SuccessfulPasswordBasicPage
