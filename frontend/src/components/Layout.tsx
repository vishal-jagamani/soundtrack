import { FC, ReactNode } from 'react'
import Sidebar from './sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='grid grid-cols-[280px_minmax(900px,_1fr)]'>
      <Sidebar />
      <div className='px-6 py-8'>{children}</div>
    </div>
  )
}

export default Layout
