import TableSkeleton from '@/components/skeleton/TableSkeleton'
import TrackTable from '@/components/table/TrackTable'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'

const TopTracks: FC = () => {
  const PARAMS = useParams()
  const { data: TopTracksData, isLoading: TopTracksIsLoading } = useGetRequestQuery(`/artists/${PARAMS?.id}/topTracks?market=US`)

  return (
    <div className='mt-6'>
      <TableSkeleton loading={TopTracksIsLoading} />
      {!TopTracksIsLoading && <TrackTable tableTile='Popular Tracks' data={TopTracksData?.data ?? []} hideImage={false} />}
    </div>
  )
}

export default TopTracks
