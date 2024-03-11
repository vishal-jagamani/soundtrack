import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const LinkModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} variant={'light'} className='text-xs'>
          Link now
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Exciting News on the Horizon!</DialogTitle>
          {/* <DialogDescription className='mt-2'>hello</DialogDescription> */}
        </DialogHeader>
        <p className='tex mt-2 text-sm text-muted-foreground'>
          Get ready for something amazing! We're working behind the scenes to bring you a thrilling new experience. Stay tuned for updates
          and be part of the excitement. The wait will be worth it! 🚀 <span className='text-primary'>#ComingSoon</span>
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LinkModal
