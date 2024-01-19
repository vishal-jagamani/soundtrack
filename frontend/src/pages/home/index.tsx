import { Button } from '@/components/ui/button'
import { FC } from 'react'
import { Link } from 'react-router-dom'
const Home: FC = () => {
  return (
    <div className='flex justify-between items-center w-full'>
      {/* <Sidebar /> */}
      <h1>Home</h1>
      <Link to={'/sign-in'}>
        <Button>Log In</Button>
      </Link>
    </div>
  )
}

export default Home
