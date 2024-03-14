import TableSkeleton from '@/components/skeleton/TableSkeleton'
import PlayListTable from '@/components/table/PlayListTable'
import { Track } from '@/utils/types/playlistType'
import { FC } from 'react'

interface TracksProps {
  data: Track
  isLoading: Boolean
}

const Tracks: FC<TracksProps> = ({ data, isLoading }) => {
  return (
    <>
      <TableSkeleton loading={isLoading} />
      {!isLoading && <PlayListTable tableTile='Tracks featuring this playlist' data={data ?? []} hideImage={true} />}
    </>
  )
}

export default Tracks
