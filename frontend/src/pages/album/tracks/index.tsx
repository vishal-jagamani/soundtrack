import TrackTable from '@/components/table/TrackTable'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'

const Tracks: FC = () => {
  const PARAMS = useParams()
  const { data: TopTracksData, isLoading: TopTracksIsLoading } = useGetRequestQuery(`/albums/${PARAMS?.id}/tracks`)

  console.log('🚀 ~ TopTracksData:', TopTracksData)
  return (
    <>
      {TopTracksIsLoading &&
        Array.from(Array(10).keys())?.map((_, i) => <Skeleton className='mt-1 flex h-8 items-center md:space-x-3' key={i} />)}
      <TrackTable tableTile='' data={TopTracksData?.data?.tracks ?? []} hideImage={true} />
    </>
  )
}

export default Tracks
