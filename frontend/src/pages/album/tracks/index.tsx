import TableSkeleton from '@/components/skeleton/TableSkeleton'
import TrackTable from '@/components/table/TrackTable'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC } from 'react'
import { useParams } from 'react-router'

const Tracks: FC = () => {
  const PARAMS = useParams()
  const { data: TrackData, isLoading: TrackDataIsLoading } = useGetRequestQuery(`/albums/${PARAMS?.id}/tracks`)

  return (
    <>
      <TableSkeleton loading={TrackDataIsLoading} />
      {!TrackDataIsLoading && <TrackTable tableTile='' data={TrackData?.data?.tracks ?? []} hideImage={true} />}
    </>
  )
}

export default Tracks
