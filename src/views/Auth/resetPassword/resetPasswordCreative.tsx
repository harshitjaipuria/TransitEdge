'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import mainLogo from '@assets/images/main-logo.png'
import whiteLogo from '@assets/images/logo-white.png'
import creativeAuth from '@assets/images/others/auth-creative.png'
import Image from 'next/image'
import { Eye, EyeOff, MoveRight } from 'lucide-react'
import { toast } from 'react-toastify'

const ResetPasswordCreative: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password) {
      toast.error('Please enter your password')
      return
    }

    if (!confirmPassword) {
      toast.error('Please confirm your password')
      return
    }

    if (password === confirmPassword) {
      router.push('/auth/signin-basic')
    } else {
      toast.error('Passwords do not match')
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
        <div className='flex items-center lg:min-h-screen col-span-12 lg:col-span-6 py-9 md:py-12'>
          <div className='grid w-full grid-cols-12'>
            <div className='col-span-12 2xl:col-span-8 2xl:col-start-3 mx-4 md:mx-12 mb-0 card'>
              <div className='md:p-10 card-body'>
                <h4 className='mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text'>
                  Set your new password
                </h4>
                <p className='mb-5 text-center text-gray-500'>
                  Ensure that your new password is different from any passwords you&apos;ve
                  previously used.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-12 gap-4 mt-5'>
                    <div className='col-span-12'>
                      <label htmlFor='passwordInput' className='form-label'>
                        Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id='passwordInput'
                          className='ltr:pr-8 rtl:pl-8 form-input'
                          placeholder='Enter your password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword((prev) => !prev)}
                          className='absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-none'
                        >
                          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className='col-span-12'>
                      <label htmlFor='confirmPasswordInput' className='form-label'>
                        Confirm Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id='confirmPasswordInput'
                          className='ltr:pr-8 rtl:pl-8 form-input'
                          placeholder='Enter your confirm password'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type='button'
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className='absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-none'
                        >
                          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className='col-span-12'>
                      <button
                        type='submit'
                        className='w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600'
                      >
                        Set Password
                      </button>

                      <p className='mt-3 text-center text-gray-500'>
                        Return to the
                        <Link
                          href='/auth/signin-creative'
                          className='font-medium underline link link-primary'
                        >
                          <span className='align-middle'>Sign In</span>
                          <MoveRight className='inline-block ml-1 size-4' />
                        </Link>
                      </p>
                    </div>
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

export default ResetPasswordCreative
