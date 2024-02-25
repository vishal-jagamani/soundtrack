import { FC } from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router'
import { Toaster } from './ui/toaster'
import Navbar from './navbar'
// import { useAuth } from '@/utils/hof/AuthContext'

const Layout: FC = () => {
  // const { accessToken, setAccessToken } = useAuth()
  // console.log('🚀 ~ accessToken:', accessToken, setAccessToken)
  return (
    <>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-[auto,1fr] mt-12'>
        <Sidebar />
        <div className='px-6 pt-4 max-w-screen-xl mx-auto w-full overflow-x-hidden'>
          <Outlet />
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default Layout
