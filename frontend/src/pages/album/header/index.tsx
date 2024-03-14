import DetailPageHeader from '@/components/skeleton/DetailPageHeader'
import { AlbumType, SmallArtistType } from '@/utils/types/type'
import { Dot, PauseCircle, PlayCircle } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'sonner'

interface HeaderProps {
  data: AlbumType
  dataLoading: boolean
}

const Header: FC<HeaderProps> = ({ data, dataLoading }) => {
  const [play, setPlay] = useState<boolean>(false)
  const [following, setFollowing] = useState<boolean>(true)

  const totalDurationMs: number = data?.tracks?.items.reduce((total, track) => total + track.duration_ms, 0)
  const totalMinutes: number = Math.floor(totalDurationMs / 60000)
  const totalSeconds: number = +((totalDurationMs % 60000) / 1000).toFixed(0)

  const handleFollowButtonClick = () => {
    if (following) {
      setFollowing(false)
      toast('Un-followed the artist')
    } else {
      setFollowing(true)
      toast('Followed the artist')
    }
  }

  const extractYear = (dateString: string): number => {
    const year = parseInt(dateString.split('-')[0], 10)
    return year
  }
  return (
    <>
      <DetailPageHeader loading={dataLoading} />

      {data && (
        <div className='flex flex-col items-center space-y-4 md:flex-row md:items-end md:space-x-4'>
          <img
            src={data?.images?.[0]?.url}
            loading='lazy'
            draggable={false}
            className='size-48 border-2 border-primary object-cover md:size-56'
          />
          <div className='flex-1 items-center space-y-2 md:space-y-4'>
            <h1 className='line-clamp-2 select-none text-center text-2xl font-bold md:text-start md:text-6xl'>{data?.name}</h1>
            <div className='flex items-center justify-center space-x-1 md:justify-start'>
              {data?.artists?.map((artist: SmallArtistType, index: number) => (
                <>
                  {index > 0 ? <Dot /> : null}
                  <p className='cursor-pointer select-none text-xs text-muted-foreground transition-all hover:text-foreground/80 hover:underline'>
                    {artist?.name}
                  </p>
                </>
              ))}
              <Dot size={15} />

              <p className='select-none text-xs text-muted-foreground transition-all hover:text-foreground/80'>
                {totalMinutes} min {totalSeconds > 0 ? `${totalSeconds} s` : ''}
              </p>
              <Dot size={15} />
              <p className='select-none text-xs text-muted-foreground transition-all hover:text-foreground/80'>
                {extractYear(data?.releaseDate)}
              </p>
            </div>
            <div className='mt-4 flex items-center justify-center space-x-4 md:justify-start md:space-x-6'>
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
              {/* <MoreHorizontal
                size={40}
                className='text-muted-foreground hover:scale-105 hover:cursor-pointer hover:text-secondary-foreground'
              /> */}
            </div>
          </div>
        </div>
      )}

      {/* <Separator className='my-6' /> */}
    </>
  )
}

export default Header
