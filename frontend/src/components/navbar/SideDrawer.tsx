// import React from 'react'

import { Home, ListVideo, Menu, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { DrawerTrigger, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '../ui/drawer'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'

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

  return (
    <Drawer direction='left'>
      <DrawerTrigger>
        <Menu className='cursor-pointer' />
      </DrawerTrigger>
      <DrawerContent showSlider={false} className='left-0 top-0 w-72 mt-0'>
        {/* <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
        <div className='w-full px-6 py-4 h-screen space-y-6'>
          {/* <h1 className='pb-8 pt-4'>SOUNDTRACK!</h1> */}

          <div className='w-[240px] flex items-center lg:border-r py-2'>
            <div className='p-2 hover:bg-muted lg:hidden'>
              <DrawerClose>
                <Menu className='cursor-pointer' />
              </DrawerClose>
            </div>
            <h1 className='ml-4'>SOUNDTRACK!</h1>
          </div>

          {sidebarItems?.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center flex-row gap-x-4 space-y-0 hover:bg-secondary p-2 transition-all cursor-pointer `}
            >
              <DrawerClose>
                {React.cloneElement(icon, {
                  strokeWidth: location?.pathname === to ? 2 : 2,
                  className: location?.pathname === to ? 'text-primary' : '',
                  // fill: 'bg-primary',
                })}
              </DrawerClose>
              <h1 className={`text-sm transition-all font-normal ${location?.pathname === to ? 'text-primary' : ''}`}>{label}</h1>
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default SideDrawer
