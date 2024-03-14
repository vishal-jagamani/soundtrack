// import TrackCard from '@/components/card/TrackCard'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useAuth } from '@/utils/hof/AuthContext'
import List from './list'
const Home: FC = () => {
  const { data: FeaturedPlaylist, isLoading } = useGetRequestQuery(`/playlists/featured?limit=15&offset=0`)
  const { data: NewRelease } = useGetRequestQuery(`/albums/newReleases?limit=15&offset=0`)
  const { user } = useAuth()
  return (
    <>
      <div className='wrapper-container'>
        <h1 className='select-none font-major text-xl font-bold lowercase text-primary'>
          {user?.firstName ? 'Hi,' : 'Welcome'} {user?.firstName}
        </h1>
        <p className='mt-1 select-none text-sm text-foreground/80'>This content is exclusively crafted for you.</p>

        <>
          {isLoading ? (
            <div className='grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible'>
              <div
                className='h-12 w-12 animate-spin rounded-full
                    border-2 border-solid border-primary border-t-transparent'
              />
            </div>
          ) : (
            <div className='mt-8 space-y-8'>
              <List data={FeaturedPlaylist?.data} title={'playlists'} />
              <List data={NewRelease?.data?.data} title={'albums'} />
            </div>
          )}
        </>
      </div>
    </>
  )
}

export default Home
