import { Button } from '@/components/ui/button'
import { useVerifyOTPMutation } from '@/contexts/api/generalApiService'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import OtpInput from 'react-otp-input'
const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.3 } },
  exit: { opacity: 0, x: 200 },
}
interface EmailProps {
  //   handleChangeStep: (val: number) => void
}
const OtpVerify: FC<EmailProps> = ({}) => {
  const [otp, setOtp] = useState<string>('')
  const [VerifyOTP, response] = useVerifyOTPMutation()
  console.log('🚀 ~ response:', response)

  const handleVerifyOtp = () => {
    const RAW_DATA = { userId: 3, otp }
    VerifyOTP(RAW_DATA)
  }

  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <p className='mt-3'>Please enter otp sent to : n*****@gmail.com</p>

      <form action='#' className='mt-6 grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          {/* <Input type='password' placeholder='Password' /> */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className='w-4'> </span>}
            renderInput={props => <input {...props} />}
            // inputStyle='bg-secondary text-3xl text-foreground mr-4 w-[54px] h-[54px] focus:b-primary'
            inputStyle={{ width: 60, height: 90, fontSize: 30, backgroundColor: '#292929' }}
            containerStyle='w-full justify-between px-0'
          />
          <div className='flex justify-end mt-2'>
            <Button variant={'link'} className='p-0'>
              Resend OTP
            </Button>
          </div>

          <Button className='w-full mt-6' onClick={() => handleVerifyOtp()}>
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
