import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useUserLoginMutation } from '@/contexts/api/authApiService'
import { RootState } from '@/contexts/store/store'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
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

  const handleChangePassword = (val: string): void => {
    setPassword(val)
    // setErrors("Password doesn't match")
    // validatePassword(val)
  }

  const handleSubmit = async () => {
    try {
      const RAW_DATA = { userId: user?.userId, email: user?.email, password }
      const response = await TRIGGER_LOGIN(RAW_DATA)?.unwrap()
      if (response?.status) {
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
      {/* <form action='#' className='mt-8 grid grid-cols-6 gap-6'> */}
      <div className='col-span-6 mt-8'>
        <Input type='password' placeholder='Password' value={password} onChange={e => handleChangePassword(e.target.value)} />
        {errors.length ? <p className='text-xs text-red-500 mt-2'>{errors}</p> : null}
        {/* <Link to={'/'}> */}
        <Button className='w-full mt-6' onClick={() => handleSubmit()}>
          {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
          Submit
        </Button>
        {/* </Link> */}
      </div>
      {/* </form> */}
    </motion.div>
  )
}

export default Password
