import { FC } from 'react'
import SideDrawer from '../sidebar/SideDrawer'
import ProfileMenu from './ProfileMenu'

const Navbar: FC = () => {
  return (
    <nav className='nbackdrop-blur fixed top-0 z-10 flex w-full items-center justify-between'>
      <div className='ml-4 flex w-[240px] items-center py-2 lg:border-r lg:pb-4 lg:pt-6'>
        <div className='flex size-10 items-center justify-center hover:bg-muted lg:hidden'>
          <SideDrawer />
        </div>
        <h1 className='ml-2 whitespace-nowrap font-major text-xl text-primary'>SOUNDTRACK!</h1>
      </div>

      <ProfileMenu />
    </nav>
  )
}

export default Navbar
