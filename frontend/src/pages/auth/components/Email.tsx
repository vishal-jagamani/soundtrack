import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCheckEmailAddressMutation } from '@/contexts/api/generalApiService'
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.5 } },
  exit: { opacity: 0, x: 200 },
}
interface EmailProps {
  handleChangeStep: (val: number) => void
}

const Email: FC<EmailProps> = ({ handleChangeStep }) => {
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [login, { data: response }] = useCheckEmailAddressMutation()

  const handleSubmit = () => {
    const RAW_DATA = { email: emailAddress }
    login(RAW_DATA)
  }

  useEffect(() => {
    if (response) {
      const { otpVerificationMailSent, userExist } = response

      otpVerificationMailSent ? handleChangeStep(1) : userExist ? handleChangeStep(2) : null
    }
  }, [response])
  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          <Input
            type='email'
            placeholder='Email'
            value={emailAddress}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(event.target.value)}
          />

          <Button className='w-full mt-6' onClick={() => handleSubmit()}>
            Continue
          </Button>
        </div>
      </form>

      <div className='relative my-8'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-500'></span>
        </div>
        {/* <div className="text-xs text-muted-foreground text-center bg-black ">OR CONTINUE WITH</div> */}
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>OR</span>
        </div>
      </div>

      <Button variant={'outline'} className='w-full' onClick={() => handleSubmit()}>
        {/* <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> */}
        Continue with Spotify
      </Button>
      <div className='my-2 invisible'>hidden</div>
    </motion.div>
  )
}

export default Email
