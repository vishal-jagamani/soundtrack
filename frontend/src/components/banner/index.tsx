import LinkModal from '../linkModal'
// import { Button } from '../ui/button'

const Banner = () => {
  return (
    <div className='fixed bottom-0 flex w-full items-center justify-between bg-gradient-to-r from-primary to-red-600 p-2'>
      <p className='text-xs '>Oops! Link your Spotify account in Settings for seamless music. Happy listening!</p>
      {/* <Button size={'sm'} variant={'light'} className='text-xs'>
        Link now
      </Button> */}
      <LinkModal />
    </div>
  )
}

export default Banner
