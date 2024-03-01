import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocalStorage } from '@/utils/customHooks/useLocalStorage'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ThemeToggle from './ThemeToggle'

const ProfileMenu: FC = () => {
  const [localStorage] = useLocalStorage('user')
  const navigate = useNavigate()
  const handleSignOut = (val: any) => {
    if (val) {
      //   setLocalStorage('logout')
    } else navigate('/sign-in')
  }

  return (
    <div className='flex items-center'>
      <ThemeToggle />
      <DropdownMenu>
        <div className='mr-4 max-w-screen-xl md:mr-8'>
          <DropdownMenuTrigger>
            <Avatar className='h-8 w-8 cursor-pointer'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='right-24'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Terms & privacy policy</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
          <DropdownMenuItem>Send feedback</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer' onClick={() => handleSignOut(localStorage)}>
            {localStorage ? 'Sign out' : 'Sign in'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ProfileMenu
