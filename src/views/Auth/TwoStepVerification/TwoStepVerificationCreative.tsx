'use client'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import mainLogo from '@assets/images/main-logo.png'
import whiteLogo from '@assets/images/logo-white.png'
import creativeAuth from '@assets/images/others/auth-creative.png'
import Image from 'next/image'
import { MailOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface OTPFormProps {
  formId: string
}

const TwoStepVerificationCreative: React.FC<OTPFormProps> = ({ formId }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)

  const router = useRouter()

  useEffect(() => {
    const form = formRef.current
    const inputs = form
      ? (Array.from(form.querySelectorAll('input[type=text]')) as HTMLInputElement[])
      : []
    const submitButton = submitButtonRef.current

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLInputElement
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'Tab' &&
        !e.metaKey
      ) {
        e.preventDefault()
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const index = inputs.indexOf(target)
        if (index > 0) {
          inputs[index - 1].value = ''
          inputs[index - 1].focus()
        }
      }
    }

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      const index = inputs.indexOf(target)
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus()
        } else {
          submitButton?.focus()
        }
      }
    }

    const handleFocus = (e: FocusEvent) => {
      ;(e.target as HTMLInputElement).select()
    }

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      const text = e.clipboardData?.getData('text')
      if (!text || !/^[0-9]{6}$/.test(text)) return // Adjust length based on the number of inputs
      const digits = text.split('')
      inputs.forEach((input, index) => (input.value = digits[index]))
      submitButton?.focus()
    }

    inputs.forEach((input) => {
      input.addEventListener('input', handleInput)
      input.addEventListener('keydown', handleKeyDown)
      input.addEventListener('focus', handleFocus)
      input.addEventListener('paste', handlePaste)
    })

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('input', handleInput)
        input.removeEventListener('keydown', handleKeyDown)
        input.removeEventListener('focus', handleFocus)
        input.removeEventListener('paste', handlePaste)
      })
    }
  }, [formId])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = formRef.current
    if (!form) return

    const inputs = Array.from(form.querySelectorAll('input[type=text]')) as HTMLInputElement[]
    const otp = inputs.map((input) => input.value).join('')

    if (otp.length !== 6) {
      toast.error('Please enter a valid OTP')
      return
    } else {
      router.push('/auth/reset-password-creative')
    }
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-12'>
        <div className='relative col-span-12 py-8 overflow-hidden bg-gray-100 dark:bg-dark-850 lg:min-h-screen lg:col-span-6 md:p-9 xl:p-12'>
          <div className='absolute bottom-0 w-32 -rotate-45 -top-64 -right-8 bg-gray-200/20 dark:bg-dark-800/20'></div>
          <div className='p-4'>
            <Link href='/'>
              <Image
                src={mainLogo}
                alt='mainLogo'
                className='h-8 mx-auto dark:hidden inline-block'
                width={176}
                height={32}
              />
              <Image
                src={whiteLogo}
                alt='whiteLogo'
                className='hidden h-8 mx-auto dark:inline-block'
                width={176}
                height={32}
              />
            </Link>
            <h1 className='max-w-lg mt-8 text-2xl font-normal leading-tight capitalize md:leading-tight md:text-4xl'>
              The most straightforward way to manage your projects
            </h1>
            <Image
              src={creativeAuth}
              alt='creativeAuth'
              className='mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] xl:left-[115px]'
            />
          </div>
        </div>
        <div className='flex items-center lg:min-h-screen col-span-12 lg:col-span-6 py-9 md:py-122'>
          <div className='grid w-full grid-cols-12'>
            <div className='col-span-12 2xl:col-span-8 2xl:col-start-3 mx-4 md:mx-12 mb-0 card'>
              <div className='p-10 card-body'>
                <div className='mb-4 text-center'>
                  <div className='flex items-center justify-center mx-auto size-9 sm:size-12 md:size-14'>
                    <MailOpen className='text-gray-500 stroke-1 dark:text-dark-500 size-10 fill-gray-100 dark:fill-dark-850' />
                  </div>
                </div>
                <h4 className='mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text'>
                  OTP Verification
                </h4>
                <p className='mb-5 text-center text-gray-500'>
                  We&apos;re sent a code to <b>sophiamia@example.com</b>
                </p>
                <form id={formId} onSubmit={handleSubmit} ref={formRef}>
                  <div className='flex items-center justify-center gap-3'>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input
                        key={index}
                        type='text'
                        className='text-2xl font-extrabold text-center bg-gray-100 border border-transparent rounded outline-none appearance-none size-9 sm:size-12 md:size-14 text-slate-900 dark:text-dark-50 dark:bg-dark-850 hover:border-slate-200 dark:hover:border-dark-800 focus:bg-white dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15'
                        pattern='\d*'
                        maxLength={1}
                      />
                    ))}
                  </div>
                  <div className='mt-5'>
                    <button type='submit' className='w-full btn btn-primary' ref={submitButtonRef}>
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoStepVerificationCreative
