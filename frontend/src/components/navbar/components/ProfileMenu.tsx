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
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '@/utils/hof/AuthContext'

const ProfileMenu: FC = () => {
  const [localStorage, setLocalStorage] = useLocalStorage('userDetails')
  const navigate = useNavigate()
  const { user } = useAuth()
  const handleSignOut = (val: any) => {
    if (val) {
      setLocalStorage('logout')
      navigate('/sign-in')
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
          <DropdownMenuLabel>
            <div>
              <h1 className='mb-1'>{user?.isLoggedIn ? `${user?.firstName} ${user?.lastName}` : 'My Account'}</h1>
              <p className='text-xs text-muted-foreground'>{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Terms & privacy policy</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
          <DropdownMenuItem>Send feedback</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer' onClick={() => handleSignOut(localStorage)}>
            {user?.isAnonymous ? 'Sign in' : 'Sign out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ProfileMenu
