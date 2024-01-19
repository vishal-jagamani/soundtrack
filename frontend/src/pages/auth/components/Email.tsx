import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { FC } from 'react'
const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.5 } },
  exit: { opacity: 0, x: 200 },
}
interface EmailProps {
  handleChangeStep: (val: number) => void
}
const Email: FC<EmailProps> = ({ handleChangeStep }) => {
  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          <Input type='email' placeholder='Email' />

          <Button className='w-full mt-6' onClick={() => handleChangeStep(1)}>
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

      <Button variant={'outline'} className='w-full'>
        {/* <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> */}
        Continue with Spotify
      </Button>
    </motion.div>
  )
}

export default Email
