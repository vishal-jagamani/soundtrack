import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'
import Header from './header'
import Tracks from './tracks'

const Playlist: FC = () => {
  const PARAMS = useParams()
  const { data: PlayListData, isLoading: PlayListDataLoading } = useGetRequestQuery(`/playlists/${PARAMS?.id}`)
  return (
    <div className='wrapper-container'>
      <Header data={PlayListData?.data} dataLoading={PlayListDataLoading} />
      <Tracks data={PlayListData?.data?.tracks?.items} isLoading={PlayListDataLoading} />
    </div>
  )
}

export default Playlist
