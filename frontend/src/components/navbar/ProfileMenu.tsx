import { FC, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useLocalStorage } from '@/utils/customHooks/useLocalStorage'
import { useNavigate } from 'react-router'
import { useTheme } from '../theme-provider'

// const themeType = string | null | undefined

const ProfileMenu: FC = () => {
  const [localStorage] = useLocalStorage('user')
  const [theme] = useLocalStorage('soundtrack-ui-theme')
  const [toggleTheme, setToggleTheme] = useState<any>(theme)
  const { setTheme } = useTheme()
  const navigate = useNavigate()
  const handleSignOut = (val: any) => {
    if (val) {
      //   setLocalStorage('logout')
    } else navigate('/sign-in')
  }

  const handleToggleTheme = () => {
    setToggleTheme(toggleTheme === 'light' ? 'dark' : 'light')
    setTheme(toggleTheme === 'light' ? 'dark' : 'light')
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='mr-4 max-w-screen-xl md:mr-8'>
            <Avatar className='h-8 w-8 cursor-pointer'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='right-24'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleToggleTheme()}>Switch mode</DropdownMenuItem>
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
