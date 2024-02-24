import { FC } from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router'
import { Toaster } from './ui/toaster'
import { useAuth } from '@/utils/hof/AuthContext'

const Layout: FC = () => {
  const { accessToken, setAccessToken } = useAuth()
  console.log('🚀 ~ accessToken:', accessToken, setAccessToken)
  return (
    <div className='grid grid-cols-[280px_minmax(900px,_1fr)]'>
      <Sidebar />
      <div className='px-6 py-8'>
        <Outlet />
      </div>
      <Toaster />
    </div>
  )
}

export default Layout
