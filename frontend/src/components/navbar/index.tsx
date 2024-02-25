import { FC, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { Menu } from 'lucide-react'
import SideDrawer from './SideDrawer'

const Navbar: FC = () => {
  return (
    <nav className='flex items-center justify-between fixed top-0 w-full bg-background'>
      <div className='w-[240px] flex items-center ml-4 lg:border-r py-2 lg:pt-6 lg:pb-4'>
        <div className='p-2 hover:bg-muted lg:hidden'>
          {/* <Menu className='cursor-pointer' /> */}
          <SideDrawer />
        </div>
        <h1 className='ml-4 -mt-1'>SOUNDTRACK!</h1>
      </div>
      <div className='max-w-screen-xl invisible md:visible mr-4'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}

export default Navbar
