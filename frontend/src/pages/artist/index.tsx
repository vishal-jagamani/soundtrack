import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'
import Albums from './albums'
import Header from './header'
import TopTracks from './topTracks'

const Artist: FC = () => {
  const PARAMS = useParams()
  const { data: ArtistData, isLoading: dataLoading } = useGetRequestQuery(`/artists/${PARAMS?.id}`)
  return (
    <div className='wrapper-container'>
      <Header data={ArtistData?.data} dataLoading={dataLoading} />
      {/* <Separator className='my-6' /> */}
      <TopTracks />
      {/* <Separator className='my-6' /> */}

      <Albums />
    </div>
  )
}

export default Artist
