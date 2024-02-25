import { FC } from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router'
import { Toaster } from './ui/toaster'
import Navbar from './navbar'
import Banner from './banner'
// import { useAuth } from '@/utils/hof/AuthContext'

const Layout: FC = () => {
  // const { accessToken, setAccessToken } = useAuth()
  // console.log('🚀 ~ accessToken:', accessToken, setAccessToken)
  return (
    <>
      <Navbar />
      <div className='mt-14 grid grid-cols-1 md:grid-cols-[auto,1fr]'>
        <Sidebar />
        <div className='mx-auto w-full max-w-screen-xl overflow-x-hidden px-6 pt-4'>
          <Outlet />
        </div>
        <Toaster />
        <Banner />
      </div>
    </>
  )
}

export default Layout
