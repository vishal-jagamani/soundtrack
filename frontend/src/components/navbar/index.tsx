import { FC } from 'react'
import SideDrawer from '../sidebar/SideDrawer'
import ProfileMenu from './ProfileMenu'

const Navbar: FC = () => {
  return (
    <nav className='fixed top-0 flex w-full items-center justify-between bg-background'>
      <div className='ml-4 flex w-[240px] items-center py-2 lg:border-r lg:pb-4 lg:pt-6'>
        <div className='p-2 hover:bg-muted lg:hidden'>
          <SideDrawer />
        </div>
        <h1 className='font-major -mt-1 ml-4 whitespace-nowrap text-xl text-primary'>\\ SOUNDTRACK!</h1>
      </div>
      <ProfileMenu />
    </nav>
  )
}

export default Navbar
