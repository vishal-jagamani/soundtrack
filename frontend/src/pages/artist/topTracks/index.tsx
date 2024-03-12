import TrackTable from '@/components/table/TrackTable'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'

const TopTracks: FC = () => {
  const PARAMS = useParams()
  const { data: TopTracksData, isLoading: TopTracksIsLoading } = useGetRequestQuery(`/artists/${PARAMS?.id}/topTracks?market=US`)

  return (
    <div className='mt-6'>
      {TopTracksIsLoading && (
        <div className=''>
          {Array.from(Array(5).keys())?.map((_, i) => <Skeleton className='mt-2 flex h-9 items-center md:space-x-3' key={i} />)}
        </div>
      )}
      <TrackTable tableTile='Popular Tracks' data={TopTracksData?.data ?? []} hideImage={false} />
    </div>
  )
}

export default TopTracks
