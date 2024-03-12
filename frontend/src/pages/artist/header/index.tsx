import { Skeleton } from '@/components/ui/skeleton'
import { ArtistType } from '@/utils/types/type'
import { Dot, PauseCircle, PlayCircle } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'sonner'

interface HeaderProps {
  data: ArtistType
  dataLoading: boolean
}

const Header: FC<HeaderProps> = ({ data, dataLoading }) => {
  const [play, setPlay] = useState<boolean>(false)
  const [following, setFollowing] = useState<boolean>(true)
  function formatNumber(value: number): string {
    if (value < 1e3) {
      return value.toString()
    } else if (value < 1e6) {
      return (value / 1e3).toFixed(1) + ' K'
    } else if (value < 1e9) {
      return (value / 1e6).toFixed(1) + ' M'
    } else {
      return (value / 1e9).toFixed(1) + ' B'
    }
  }

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
      {dataLoading && (
        <div className='flex items-end space-x-5'>
          <Skeleton className='size-48 object-cover md:size-72' />
          <div className='space-y-4'>
            <Skeleton className='h-24 w-56 md:w-96 ' />
            <Skeleton className='h-10 w-1/2 md:w-60' />
          </div>
          <div></div>
        </div>
      )}
      {data && (
        <div className='flex flex-col items-center  space-x-4 space-y-4 md:flex-row md:items-end'>
          <img
            src={data?.images?.[0]?.url}
            loading='lazy'
            draggable={false}
            className='size-48 border-2 border-primary object-cover md:size-56'
          />
          <div className='space-y-1 md:space-y-4'>
            <h1 className='line-clamp-2 select-none text-center text-2xl font-bold md:text-start md:text-6xl'>{data?.name}</h1>
            <div className='flex items-center justify-center space-x-1 md:justify-start'>
              <p className='flex select-none items-center text-xs text-muted-foreground'>
                {formatNumber(data?.followers?.total)} followers
              </p>
              {data?.genres?.map((genres: string) => (
                <>
                  <Dot className='text-muted-foreground' />
                  <p className='select-none text-xs capitalize text-muted-foreground transition-all'>{genres}</p>
                </>
              ))}
            </div>
            <div className='flex items-center justify-center space-x-4 md:justify-start md:space-x-6'>
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
                className='mx-4 select-none border-2 px-6 py-2 text-xs font-semibold hover:scale-105 hover:cursor-pointer hover:border-foreground active:scale-100'
                onClick={() => handleFollowButtonClick()}
              >
                {following ? 'Following' : 'Follow'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
