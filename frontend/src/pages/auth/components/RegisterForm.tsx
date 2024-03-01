import InputFormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { useUserSignUpMutation } from '@/contexts/api/authApiService'
import { RootState } from '@/contexts/store/store'
// import { useLocalStorage } from '@/utils/customHooks/useLocalStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as z from 'zod'

const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.3 } },
  exit: { opacity: 0, x: 200 },
}

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .refine(value => /[A-Z]/.test(value), { message: 'Password must contain at least one uppercase letter' })
      .refine(value => /[a-z]/.test(value), { message: 'Password must contain at least one lowercase letter' })
      .refine(value => /\d/.test(value), { message: 'Password must contain at least one digit' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

const RegisterForm: FC = ({}) => {
  const { user } = useSelector((state: RootState) => state.authData)
  const [TriggerSignUp, { isLoading }] = useUserSignUpMutation()
  const navigate = useNavigate()
  // const [, setLocalStorage] = useLocalStorage('user')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const RAW_DATA = { userId: user?.userId, ...values }
      const response = await TriggerSignUp(RAW_DATA)?.unwrap()

      if (response?.status) {
        navigate('/')
      } else {
        throw new Error('Something went wrong!')
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 w-full space-y-8'>
          {/* <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className='flex w-full gap-x-4'>
            <InputFormField placeholder='First Name' name='firstName' form={form} />
            <InputFormField placeholder='Last Name' name='lastName' form={form} />
          </div>
          <InputFormField placeholder='Password' name='password' form={form} type='password' />
          <InputFormField placeholder='Confirm Password' name='confirmPassword' form={form} type='password' />

          <Button
            className='mt-6 w-full'
            type='submit'
            //  disabled={isLoading ? true : false}
          >
            {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            Submit
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

export default RegisterForm
