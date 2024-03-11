import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { EmailVerifyData } from '@/contexts/api/apiTypes'
import { useCheckEmailAddressMutation } from '@/contexts/api/authApiService'
import { storeTempData } from '@/pages/auth/slice/authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { ToastAction } from '@radix-ui/react-toast'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().max(50).email('Please enter valid email address.'),
})
const container = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0, transition: { delay: 0.5 } },
  exit: { opacity: 0, x: 200 },
}
interface EmailProps {
  handleChangeStep: (val: number) => void
}

const Email: FC<EmailProps> = ({ handleChangeStep }) => {
  const [login, { isLoading }] = useCheckEmailAddressMutation()
  const dispatch = useDispatch()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const responseData = (await login(values)?.unwrap()) as EmailVerifyData
      const { otpVerificationMailSent, userExist } = responseData?.data
      if (responseData?.status) {
        dispatch(storeTempData(responseData?.data))
        otpVerificationMailSent ? handleChangeStep(1) : userExist ? handleChangeStep(2) : new Error('Something went wrong!')
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      })
    }
  }

  return (
    <motion.div key='email' variants={container} initial='hidden' animate='show' exit='exit'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} autoFocus={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-6 w-full' type='submit' disabled={isLoading ? true : false}>
            {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            Continue
          </Button>
        </form>
      </Form>

      <div className='relative my-8'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-500'></span>
        </div>
        {/* <div className="text-xs text-muted-foreground text-center bg-black ">OR CONTINUE WITH</div> */}
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>OR</span>
        </div>
      </div>

      <div className='flex flex-col'>
        <Button variant={'outline'} className='w-full'>
          {/* <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> */}
          Continue with Spotify
        </Button>
        <Button variant={'link'} className='mt-4 text-center text-xs'>
          Forgot Password?
        </Button>
      </div>
    </motion.div>
  )
}

export default Email
