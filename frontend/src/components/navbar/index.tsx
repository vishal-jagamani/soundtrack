import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { Menu } from 'lucide-react'
import SideDrawer from '../sidebar/SideDrawer'

const Navbar: FC = () => {
  return (
    <nav className='fixed top-0 flex w-full items-center justify-between bg-background'>
      <div className='ml-4 flex w-[240px] items-center py-2 lg:border-r lg:pb-4 lg:pt-6'>
        <div className='p-2 hover:bg-muted lg:hidden'>
          {/* <Menu className='cursor-pointer' /> */}
          <SideDrawer />
        </div>
        <h1 className='-mt-1 ml-4 text-base'>SOUNDTRACK!</h1>
      </div>
      <div className='invisible mr-4 max-w-screen-xl md:visible'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}

export default Navbar
