// import TrackCard from '@/components/card/TrackCard'
import { Button } from '@/components/ui/button'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Home: FC = () => {
  const navigate = useNavigate()

  const { data } = useGetRequestQuery('/spotify/search')
  console.log('🚀 ~ testDAta:', data)
  return (
    <>
      <div className='flex justify-between items-center w-full mb-4 '>
        <h1>Home</h1>
        <Button onClick={() => navigate('/sign-in')}>Log In</Button>
      </div>
      {/* <TrackCard data={}/> */}
    </>
  )
}

export default Home
