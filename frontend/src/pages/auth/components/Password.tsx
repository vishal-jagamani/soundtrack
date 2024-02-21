import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.3 } },
  exit: { opacity: 0, x: 200 },
}

interface PasswordItems {
  key: string
  label: string
}

interface PasswordErrors {
  minValueValidation: boolean
  numberValidation: boolean
  capitalLetterValidation: boolean
  specialCharacterValidation: boolean
}

const PasswordCheck: PasswordItems[] = [
  { label: 'Password must be at least 8 Characters', key: 'minValueValidation' },
  { label: 'Password must have at least one Number', key: 'numberValidation' },
  { label: 'Password must have at least one Capital Letter', key: 'capitalLetterValidation' },
  { label: 'Password must have at least one Special Character', key: 'specialCharacterValidation' },
]

const Password: FC = ({}) => {
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<PasswordErrors>({
    minValueValidation: false,
    numberValidation: false,
    capitalLetterValidation: false,
    specialCharacterValidation: false,
  })

  const handleChangePassword = (val: string): void => {
    setPassword(val)
    validatePassword(val)
  }

  const validatePassword = (password: string): void => {
    setErrors({
      minValueValidation: password.length >= 8,
      numberValidation: /\d/.test(password),
      capitalLetterValidation: /[A-Z]/.test(password),
      specialCharacterValidation: /[^A-Za-z0-9]/.test(password),
    })
  }
  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <form action='#' className='mt-8 grid grid-cols-6 gap-6'>
        <div className='col-span-6'>
          <Input type='password' placeholder='Password' value={password} onChange={e => handleChangePassword(e.target.value)} />

          <Link to={'/'}>
            <Button
              className='w-full mt-6'
              //  onClick={() => handleChangeStep(2)}
            >
              Submit
            </Button>
          </Link>
        </div>
      </form>
      {PasswordCheck?.map((item: PasswordItems) => {
        return (
          <div className='relative mt-3' key={item.label}>
            <div className='flex gap-x-4'>
              {errors[item.key as keyof PasswordErrors] ? <Check className='text-green-500' /> : <X className='text-red-600' />}
              <p className='text-foreground'>{item?.label}</p>
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}

export default Password
