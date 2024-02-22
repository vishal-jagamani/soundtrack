import TrackCard from '@/components/card/TrackCard'
import { Button } from '@/components/ui/button'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Home: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='flex justify-between items-center w-full max-w-screen-xl mx-auto mb-4 '>
        <h1>Home</h1>
        <Button onClick={() => navigate('/sign-in')}>Log In</Button>
      </div>
      <TrackCard />
    </>
  )
}

export default Home
