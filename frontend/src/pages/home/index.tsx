// import TrackCard from '@/components/card/TrackCard'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import HomeList from './HomeList'
const Home: FC = () => {
  const { data: FeaturedPlaylist, isLoading } = useGetRequestQuery(`/playlists/featured?limit=15&offset=0`)
  const { data: NewRelease } = useGetRequestQuery(`/albums/newReleases?limit=15&offset=0`)
  console.log('🚀 ~ FeaturedPlaylist:', NewRelease?.data?.data)
  return (
    <>
      <div className='wrapper-container'>
        <h1 className='font-major text-xl font-bold text-primary'>hi, niranjan</h1>
        <p className='mt-1 text-sm text-muted-foreground'>This content is exclusively crafted for you.</p>

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
              <HomeList data={FeaturedPlaylist?.data} title={'playlists'} />
              <HomeList data={NewRelease?.data?.data} title={'albums'} />
            </div>
          )}
        </>
      </div>
    </>
  )
}

export default Home
