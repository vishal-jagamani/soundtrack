import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { useVerifyOTPMutation } from '@/contexts/api/authApiService'
import { RootState } from '@/contexts/store/store'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
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
  const [errors, setErrors] = useState<string>('')
  const [VerifyOTP, { isLoading }] = useVerifyOTPMutation()
  const { user } = useSelector((state: RootState) => state.authData)

  const handleVerifyOtp = async () => {
    const RAW_DATA = { userId: user?.userId, otp }
    if (otp?.length < 6) {
      setErrors('Please enter valid OTP')
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

  function MaskEmail(email: string) {
    const atIndex = email.indexOf('@')
    const maskedPart = email.slice(0, 3)
    const maskedEmail = maskedPart + '*'.repeat(atIndex - 3) + email.slice(atIndex)
    return maskedEmail
  }

  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <p className='mt-3'>Please enter otp sent to : {MaskEmail(user?.email)}</p>
      <form action='#' className='mt-6 grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          {/* <Input type='password' placeholder='Password' /> */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className='w-4'> </span>}
            renderInput={props => <input {...props} />}
            inputStyle={{ width: 60, height: 90, fontSize: 30, backgroundColor: '#292929', accentColor: '#ea580c' }}
            containerStyle='w-full justify-between px-0'
          />
          {errors.length ? <p className='text-xs text-red-500 mt-2'>{errors}</p> : null}

          <div className='flex justify-end mt-2'>
            <Button variant={'link'} className='p-0'>
              Resend OTP
            </Button>
          </div>

          <Button className='w-full mt-6' onClick={() => handleVerifyOtp()} disabled={isLoading ? true : false}>
            {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            Submit
          </Button>
        </div>
      </form>

      <div className='relative my-8 invisible'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-500'></span>
        </div>
        {/* <div className="text-xs text-muted-foreground text-center bg-black ">OR CONTINUE WITH</div> */}
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>OR</span>
        </div>
      </div>

      <Button variant={'outline'} className='w-full invisible'>
        {/* <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> */}
        Continue with Spotify
      </Button>
    </motion.div>
  )
}

export default OtpVerify
