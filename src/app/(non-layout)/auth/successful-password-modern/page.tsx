import { NextPageWithLayout } from '@src/dtos'
import Layout2 from '@src/layout/Layout2'
import SuccessfulPasswordModern from '@src/views/Auth/SuccessfulPassword/SuccessfulPasswordModern'
import React from 'react'

const SuccessfulPasswordModernPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <SuccessfulPasswordModern />
    </React.Fragment>
  )
}

export default SuccessfulPasswordModernPage
