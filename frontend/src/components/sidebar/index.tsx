import { Home, ListVideo, Search } from 'lucide-react'
import { FC } from 'react'

const Sidebar: FC = () => {
  return (
    <div className='w-full px-6 py-4 h-screen border-r'>
      <h1 className='pb-8 pt-4'>SOUNDTRACK!</h1>

      <>
        <div className='flex items-center gap-x-4 mb-6 hover:bg-primary p-4 transition-all cursor-pointer'>
          <Home />
          <h1 className='text-base font-medium'>Home</h1>
        </div>
        <div className='flex items-center gap-x-4 mb-6 hover:bg-primary p-4 transition-all cursor-pointer'>
          <Search />
          <h1 className='text-base font-medium'>Search</h1>
        </div>
        <div className='flex items-center gap-x-4 mb-6 hover:bg-primary p-4 transition-all cursor-pointer'>
          <ListVideo />
          <h1 className='text-base font-medium'>Playlist</h1>
        </div>
      </>
    </div>
  )
}

export default Sidebar
