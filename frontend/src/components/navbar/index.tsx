import { FC } from 'react'
import SideDrawer from '../sidebar/components/SideDrawer'
import ProfileMenu from './components/ProfileMenu'
import { Link } from 'react-router-dom'
import LOGO from '@/assets/images/soundtrack_logo.png'

const Navbar: FC = () => {
  return (
    <nav className='fixed top-0 z-10 flex w-full items-center justify-between backdrop-blur-lg'>
      <div className='flex w-[241px] items-center py-2 md:ml-4 lg:border-r lg:pb-4 lg:pt-4'>
        <div className='flex size-10 items-center justify-center hover:bg-muted lg:hidden'>
          <SideDrawer />
        </div>
        <Link to='/'>
          {/* <h1 className='ml-2 whitespace-nowrap font-major text-xl text-primary'>SOUNDTRACK!</h1> */}
          <img src={LOGO} className='ml-2 w-full lg:w-4/5' />
        </Link>
      </div>

      <ProfileMenu />
    </nav>
  )
}

export default Navbar
