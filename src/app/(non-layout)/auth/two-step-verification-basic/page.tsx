'use client'
import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import { NextPageWithLayout } from '@src/dtos'
import { RootState } from '@src/slices/reducer'
import TwoStepVerificationBasic from '@src/views/Auth/TwoStepVerification/TwoStepVerificationBasic'
import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const TwoStepVerificationBasicPage: NextPageWithLayout = () => {
  const { layoutMode, layoutDirection } = useSelector((state: RootState) => state.Layout)

  return (
    <React.Fragment>
      <TwoStepVerificationBasic formId='otp-form1' />

      <ToastContainer
        theme={layoutMode}
        rtl={layoutDirection === LAYOUT_DIRECTION.RTL}
        position={layoutDirection === LAYOUT_DIRECTION.RTL ? 'top-left' : 'top-right'}
      />
    </React.Fragment>
  )
}

export default TwoStepVerificationBasicPage
