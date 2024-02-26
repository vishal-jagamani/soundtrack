// import React from 'react'

import { Home, ListVideo, Menu, Search } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer'

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
const SideDrawer = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Drawer direction='left'>
      <DrawerTrigger>
        <Menu className='cursor-pointer' />
      </DrawerTrigger>
      <DrawerContent showSlider={false} className='left-0 top-0 mt-0 w-72 rounded-none'>
        <div className='h-screen w-full space-y-6 px-6 py-4'>
          <div className='flex w-[240px] items-center py-2 lg:border-r'>
            <div className='p-2 hover:bg-muted lg:hidden'>
              <DrawerClose>
                <Menu className='cursor-pointer' />
              </DrawerClose>
            </div>
            <h1 className='font-major -mt-1 ml-2 whitespace-nowrap text-xl text-primary'>\\ SOUNDTRACK!</h1>
          </div>

          {sidebarItems?.map(({ to, icon, label }) => (
            <DrawerClose
              className={`flex w-full cursor-pointer flex-row items-center gap-x-4 space-y-0 p-2 transition-all hover:bg-secondary `}
              // className={`w-full`}
              key={label}
              onClick={() => navigate(to)}
            >
              {React.cloneElement(icon, {
                strokeWidth: location?.pathname === to ? 2 : 2,
                className: location?.pathname === to ? 'text-primary' : '',
              })}
              <h1 className={`text-sm font-normal transition-all ${location?.pathname === to ? 'text-primary' : ''}`}>{label}</h1>
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default SideDrawer
