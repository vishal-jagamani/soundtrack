import { FC } from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router'
import { Toaster } from './ui/toaster'
import Navbar from './navbar'
import Banner from './banner'
// import { useAuth } from '@/utils/hof/AuthContext'

const Layout: FC = () => {
  // const { accessToken, setAccessToken } = useAuth()
  return (
    <>
      <Navbar />
      <div className='mt-14 grid grid-cols-1 md:grid-cols-[auto,1fr]'>
        <div className='border-r'>
          <Sidebar />
        </div>
        <div className='relative mx-auto w-full max-w-screen-xl overflow-x-hidden'>
          <Outlet />
        </div>
        <Toaster />
        <Banner />
      </div>
    </>
  )
}

export default Layout
