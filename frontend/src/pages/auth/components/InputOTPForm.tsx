import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { useResendOTPMutation, useVerifyOTPMutation } from '@/contexts/api/authApiService'
import { RootState } from '@/contexts/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Fragment } from 'react/jsx-runtime'

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
})

interface OtpVerifyComponent {
  handleChangeStep: (val: number) => void
}

const InputOTPForm: FC<OtpVerifyComponent> = ({ handleChangeStep }) => {
  const [seconds, setSeconds] = useState<number>(30)

  const { user } = useSelector((state: RootState) => state.authData)
  const [VerifyOTP, { isLoading }] = useVerifyOTPMutation()
  const [ResendOTP] = useResendOTPMutation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleResendOTP = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const RAW_DATA = { userId: user?.userId }
    const response = await ResendOTP(RAW_DATA)?.unwrap()
    if (response?.status) setSeconds(90)
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    const RAW_DATA = { userId: user?.userId, otp: data?.pin }

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

  function MaskEmail(email: string) {
    const atIndex = email?.indexOf('@')
    const maskedPart = email?.slice(0, 3)
    const maskedEmail = maskedPart + '*'?.repeat(atIndex - 3) + email?.slice(atIndex)
    return maskedEmail
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-2'>
          <FormField
            control={form.control}
            name='pin'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=''>Please enter the one-time password sent to: {MaskEmail(user?.email)}</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    render={({ slots }) => (
                      <InputOTPGroup className='gap-2'>
                        {slots.map((slot, index) => (
                          <Fragment key={index}>
                            <InputOTPSlot className='border px-5 py-8 text-3xl' key={index} {...slot} />
                            {index !== slots.length - 1 && <InputOTPSeparator />}
                          </Fragment>
                        ))}{' '}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>Please enter the one-time password sent to your phone.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <div className='relative flex items-center'>
              <Button
                type='button'
                variant={'link'}
                className={`p-0 ${seconds <= 0 ? 'text-primary' : 'cursor-auto text-primary/80'}`}
                onClick={handleResendOTP}
              >
                Resend OTP
              </Button>
              {seconds > 0 ? <p className=' ml-2 text-sm text-muted-foreground'>(00:{seconds < 10 ? `0${seconds}` : seconds})</p> : null}
            </div>
          </div>

          <Button type='submit' disabled={isLoading ? true : false}>
            {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            Submit
          </Button>
        </form>
      </Form>
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
    </>
  )
}

export default InputOTPForm
