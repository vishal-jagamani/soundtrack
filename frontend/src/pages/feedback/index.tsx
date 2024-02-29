import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
// import { Textarea } from "@/components/ui/textarea"
// import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
const Feedback = () => {
  return (
    <div className='max-w-xl space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>Send Feedback</h1>
        <p className='text-gray-500 dark:text-gray-400'>How can we improve? We'd love to hear your thoughts.</p>
      </div>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' placeholder='Enter your name' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' placeholder='Enter your email' type='email' />
        </div>
        <div className='space-y-2'>
          <Label>Feedback</Label>
          {/* <Textarea className="min-h-[100px]" id="feedback" placeholder="Enter your feedback" /> */}
        </div>
        <div className='grid grid-cols-5 items-center'>
          <Label htmlFor='rating'>Rating</Label>
          <div className='col-span-4'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>How would you rate your experience? (1 = Poor, 5 = Excellent)</p>
          </div>
          {/* <Select className='col-span-4 row-start-2' id='rating'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Select> */}
        </div>
        <Button>Submit feedback</Button>
      </div>
    </div>
  )
}

export default Feedback
