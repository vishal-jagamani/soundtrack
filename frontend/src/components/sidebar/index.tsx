import { Home, ListVideo, Search } from 'lucide-react'
import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarItem {
  to: string
  icon: JSX.Element
  label: string
}

const sidebarItems: SidebarItem[] = [
  { to: '/', icon: <Home />, label: 'Home' },
  { to: '/search', icon: <Search />, label: 'Search' },
  { to: '/playlist', icon: <ListVideo />, label: 'Playlist' },
]

const Sidebar: FC = () => {
  const location = useLocation()

  return (
    <div className='w-full px-2 lg:px-6 py-4 h-screen lg:border-r lg:w-64 hidden md:block space-y-6'>
      {/* <h1 className='pb-8 pt-4'>SOUNDTRACK!</h1> */}

      {sidebarItems.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center flex-col lg:flex-row gap-x-4 space-y-2 lg:space-y-0 hover:bg-secondary p-1 py-2 lg:p-2 transition-all cursor-pointer `}
        >
          {React.cloneElement(icon, {
            strokeWidth: location?.pathname === to ? 2 : 2,
            className: location?.pathname === to ? 'text-primary' : '',
            // fill: 'bg-primary',
          })}
          <h1 className={`text-sm transition-all font-normal ${location?.pathname === to ? 'text-primary' : ''}`}>{label}</h1>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
