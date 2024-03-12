import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, Headphones, MoreHorizontal, PauseCircle, PlayCircle } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'sonner'

interface HeaderProps {
  data: any
  dataLoading: boolean
}

const Header: FC<HeaderProps> = ({ data, dataLoading }) => {
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
  return (
    <>
      {dataLoading && (
        <div className='flex items-end space-x-5'>
          <Skeleton className='size-48 object-cover md:size-72' />
          <div className='space-y-4'>
            <Skeleton className='h-24 w-56 md:w-96 ' />
            <Skeleton className='h-10 w-1/2 md:w-60' />
            {/* <p className='flex select-none items-center text-lg text-muted-foreground'>
                <Users size={30} className='mr-2 text-primary' />
                {formatNumber(artistData?.followers?.total)}
              </p> */}
          </div>
          <div></div>
        </div>
      )}
      {data && (
        <div className='flex flex-row items-end space-x-4 space-y-4 md:items-end'>
          <img
            src={data?.images?.[0]?.url}
            loading='lazy'
            draggable={false}
            className='size-48 border-2 border-primary object-cover md:size-56'
          />
          <div className='flex-1 space-y-4'>
            <h1 className='line-clamp-1 select-none text-xl font-bold leading-10 md:text-6xl'>{data?.name}</h1>
            <div className='flex items-center space-x-4'>
              <div className='flex'>
                <Headphones size={22} className='mr-2 text-primary' />
                <p className='select-none text-base text-muted-foreground'>{formatNumber(data?.totalTracks)}</p>
              </div>
              <div className='flex'>
                <Calendar size={22} className='mr-2 text-primary' />
                <p className='select-none text-base text-muted-foreground'>{data?.releaseDate}</p>
              </div>
            </div>
            <div className='mt-4 flex items-center space-x-4 md:space-x-6'>
              {play ? (
                <PauseCircle
                  size={60}
                  strokeWidth={1}
                  className='text-primary    hover:cursor-pointer active:scale-100'
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
              <MoreHorizontal
                size={40}
                className='text-muted-foreground hover:scale-105 hover:cursor-pointer hover:text-secondary-foreground'
              />
            </div>
          </div>
        </div>
      )}

      {/* <Separator className='my-6' /> */}
    </>
  )
}

export default Header
