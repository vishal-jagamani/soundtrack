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
    <div className='w-full px-6 py-4 h-screen border-r'>
      <h1 className='pb-8 pt-4'>SOUNDTRACK!</h1>

      {sidebarItems.map(({ to, icon, label }) => (
        <Link key={to} to={to} className={`flex items-center gap-x-4 mb-6 hover:bg-secondary p-4 transition-all cursor-pointer`}>
          {React.cloneElement(icon, {
            strokeWidth: location?.pathname === to ? 3 : 2,
            className: location?.pathname === to ? 'text-primary' : '',
          })}
          <h1 className={`text-base transition-all font-medium ${location?.pathname === to ? 'text-primary' : ''}`}>{label}</h1>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
