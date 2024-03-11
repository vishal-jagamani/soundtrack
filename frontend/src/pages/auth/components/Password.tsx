import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useUserLoginMutation } from '@/contexts/api/authApiService'
import { RootState } from '@/contexts/store/store'
import { useLocalStorage } from '@/utils/customHooks/useLocalStorage'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { FC, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.3 } },
  exit: { opacity: 0, x: 200 },
}

const Password: FC = ({}) => {
  const { user } = useSelector((state: RootState) => state.authData)
  const [TRIGGER_LOGIN, { isLoading }] = useUserLoginMutation()
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<string>('')
  const navigate = useNavigate()
  const [, setLocalStorage] = useLocalStorage('userDetails')

  const handleChangePassword = (val: string): void => {
    setPassword(val)
    // setErrors("Password doesn't match")
    // validatePassword(val)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const RAW_DATA = { userId: user?.userId, email: user?.email, password }
      const response = await TRIGGER_LOGIN(RAW_DATA)?.unwrap()
      if (response?.status) {
        setLocalStorage(response?.data)
        navigate('/')
      } else {
        setErrors(`Password doesn't match`)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
    }
  }
  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <form className='mt-8 grid grid-cols-6 gap-6' onSubmit={handleSubmit}>
        <div className='col-span-6'>
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => handleChangePassword(e.target.value)}
            autoFocus={true}
          />
          {errors.length ? <p className='mt-2 text-xs text-red-500'>{errors}</p> : null}
          {/* <Link to={'/'}> */}
          <Button type='submit' className='mt-6 w-full'>
            {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            Submit
          </Button>
          {/* </Link> */}
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

export default Password
