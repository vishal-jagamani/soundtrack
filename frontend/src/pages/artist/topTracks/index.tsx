import TrackTable from '@/components/table/TrackTable'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { MoreHorizontal, PauseCircle, PlayCircle } from 'lucide-react'
import { FC, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'

const TopTracks: FC = () => {
  const PARAMS = useParams()
  const { data: TopTracksData, isLoading: TopTracksIsLoading } = useGetRequestQuery(`/artists/${PARAMS?.id}/topTracks?market=US`)

  const [play, setPlay] = useState<boolean>(false)
  const [following, setFollowing] = useState<boolean>(true)

  const handleFollowButtonClick = () => {
    if (following) {
      setFollowing(false)
      toast('Unfollowed the artist')
    } else {
      setFollowing(true)
      toast('Followed the artist')
    }
  }

  return (
    <>
      <div className='flex items-center space-x-4 md:space-x-6'>
        {play ? (
          <PauseCircle
            size={60}
            strokeWidth={1}
            className='text-primary hover:scale-105 hover:cursor-pointer active:scale-100'
            onClick={() => setPlay(!play)}
          />
        ) : (
          <PlayCircle
            size={60}
            strokeWidth={1}
            className='text-primary hover:scale-105 hover:cursor-pointer active:scale-100'
            onClick={() => setPlay(!play)}
          />
        )}
        <p
          className='mx-4 select-none rounded-full border-2 border-muted-foreground px-6 py-2 text-sm font-semibold hover:scale-105 hover:cursor-pointer hover:border-foreground active:scale-100'
          onClick={() => handleFollowButtonClick()}
        >
          {following ? 'Following' : 'Follow'}
        </p>
        <MoreHorizontal size={40} className='text-muted-foreground hover:scale-105 hover:cursor-pointer hover:text-secondary-foreground' />
      </div>
      {TopTracksIsLoading &&
        Array.from(Array(10).keys())?.map((_, i) => <Skeleton className='mt-1 flex h-8 items-center md:space-x-3' key={i} />)}
      <TrackTable tableTile='Popular Tracks' data={TopTracksData?.data ?? []} hideImage={false} />
    </>
  )
}

export default TopTracks
