import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'
import Header from './header'
import Tracks from './tracks'
import Albums from './albums'
import { ArtistType } from '@/utils/types/type'

const Album: FC = () => {
  const PARAMS = useParams()
  const { data: ArtistData, isLoading: dataLoading } = useGetRequestQuery(`/albums/${PARAMS?.id}`)
  return (
    <div className='wrapper-container'>
      <Header data={ArtistData?.data} dataLoading={dataLoading} />
      <Tracks />
      {/* <Separator className='my-6' />   */}

      {ArtistData?.data?.artists?.map((artist: ArtistType) => <Albums artist={artist} />)}
    </div>
  )
}

export default Album
