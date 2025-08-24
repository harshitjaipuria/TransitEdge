import { NextPageWithLayout } from '@src/dtos'
import AccountDeactivationBasic from '@src/views/Auth/AccountDeactivation/AccountDeactivationBasic'
import React from 'react'

const AccountDeactivationBasicPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <AccountDeactivationBasic />
    </React.Fragment>
  )
}

export default AccountDeactivationBasicPage
