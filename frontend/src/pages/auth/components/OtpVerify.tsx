import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { useResendOTPMutation, useVerifyOTPMutation } from '@/contexts/api/authApiService'
import { RootState } from '@/contexts/store/store'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { FC, FormEvent, useEffect, useState, MouseEvent } from 'react'
import OtpInput from 'react-otp-input'
import { useSelector } from 'react-redux'
const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.3 } },
  exit: { opacity: 0, x: 200 },
}
interface EmailProps {
  handleChangeStep: (val: number) => void
}
const OtpVerify: FC<EmailProps> = ({ handleChangeStep }) => {
  const [otp, setOtp] = useState<string>('')
  const [seconds, setSeconds] = useState<number>(30)
  const [errors, setErrors] = useState<string>('')
  const [VerifyOTP, { isLoading }] = useVerifyOTPMutation()
  const [ResendOTP] = useResendOTPMutation()
  const { user } = useSelector((state: RootState) => state.authData)

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const RAW_DATA = { userId: user?.userId, otp }
    if (otp?.length < 6) {
      setErrors('Please enter valid otp')
      setTimeout(() => {
        setErrors('')
      }, 5000)
    } else {
      const response = await VerifyOTP(RAW_DATA)?.unwrap()
      if (response?.status) {
        handleChangeStep(3)
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! OTP Invalid.',
          description: 'Please verify the otp and try again.',
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
      }
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function MaskEmail(email: string) {
    const atIndex = email?.indexOf('@')
    const maskedPart = email?.slice(0, 3)
    const maskedEmail = maskedPart + '*'?.repeat(atIndex - 3) + email?.slice(atIndex)
    return maskedEmail
  }

  const handleResendOTP = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const RAW_DATA = { userId: user?.userId }
    const response = await ResendOTP(RAW_DATA)?.unwrap()
    if (response?.status) setSeconds(30)
  }

  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <p className='mt-3'>Please enter otp sent to : {MaskEmail(user?.email)}</p>
      <form className='mt-6 grid grid-cols-6 gap-6' onSubmit={handleVerifyOtp}>
        <div className='col-span-6'>
          {/* <Input type='password' placeholder='Password' /> */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType='number'
            renderSeparator={<span className='w-4'> </span>}
            renderInput={props => <input {...props} />}
            shouldAutoFocus={true}
            // inputStyle={{ width: 50, height: 90, fontSize: 30, backgroundColor: '#292929', accentColor: '#ea580c' }}
            containerStyle='px-0'
            inputStyle={'bg-secondary text-4xl md:text-5xl h-20 md:h-24 outline-primary'}
          />
          {errors.length ? <p className='mt-2 text-xs text-red-500'>{errors}</p> : null}

          <div className='mt-2 flex justify-end'>
            <div className='flex items-center'>
              <Button
                type='button'
                variant={'link'}
                className={`p-0 ${seconds <= 0 ? 'text-primary' : 'cursor-auto text-primary/80'}`}
                onClick={handleResendOTP}
              >
                Resend OTP
              </Button>
              {seconds < 0 ? <p className='ml-2 text-sm text-muted-foreground'>00:{seconds < 10 ? `0${seconds}` : seconds}</p> : null}
            </div>
          </div>

          <Button type='submit' className='mt-6 w-full' disabled={isLoading ? true : false}>
            {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            Submit
          </Button>
        </div>
      </form>

      <div className='invisible relative my-8'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-500'></span>
        </div>
        {/* <div className="text-xs text-muted-foreground text-center bg-black ">OR CONTINUE WITH</div> */}
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>OR</span>
        </div>
      </div>

      <Button variant={'outline'} className='invisible w-full'>
        {/* <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> */}
        Continue with Spotify
      </Button>
    </motion.div>
  )
}

export default OtpVerify
