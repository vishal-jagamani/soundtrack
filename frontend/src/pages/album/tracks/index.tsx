import TrackTable from '@/components/table/TrackTable'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'

const Tracks: FC = () => {
  const PARAMS = useParams()
  const { data: TopTracksData, isLoading: TopTracksIsLoading } = useGetRequestQuery(`/albums/${PARAMS?.id}/tracks`)

  return (
    <>
      {TopTracksIsLoading && (
        <div className='mt-8'>
          {Array.from(Array(5).keys())?.map((_, i) => <Skeleton className='mt-2 flex h-9 items-center md:space-x-3' key={i} />)}
        </div>
      )}
      <TrackTable tableTile='' data={TopTracksData?.data?.tracks ?? []} hideImage={true} />
    </>
  )
}

export default Tracks
