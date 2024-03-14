import { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useNavigate } from 'react-router'
interface TrackCardProps {
  data: any
  type: string
}

const TrackCard: FC<TrackCardProps> = ({ data, type }) => {
  const navigate = useNavigate()
  const IMAGE = structuredClone(data?.images) ?? []

  const priorityOrder = [300, 640, 64]
  const customSort = (a: any, b: any) => {
    const priorityA = priorityOrder.indexOf(a.height)
    const priorityB = priorityOrder.indexOf(b.height)

    return priorityA - priorityB
  }
  const sortedImages = IMAGE.sort(customSort)
  const priorityImage = sortedImages.length > 0 ? sortedImages[0] : null
  const handleNavigate = () => {
    navigate(`/${type.slice(0, -1)}/${data?.id}`)
  }

  const handleSubTitle = (data: any, type: string) => {
    if (type === 'album') {
      return data?.releaseDate?.split('-')?.[0]
    } else if (type === 'artist') {
      return `${formatNumber(data?.followers?.total)} followers`
    } else if (type === 'track') {
      return `${data?.popularity} popular`
    } else if (type === 'playlist') {
      return `${data?.tracks?.total} tracks`
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
    <Card
      className='group cursor-pointer snap-start overflow-hidden border-none transition-all hover:bg-muted '
      onClick={() => handleNavigate()}
    >
      <CardHeader className='size-40 space-y-4 p-1'>
        {priorityImage?.url ? (
          <img src={priorityImage?.url} alt='Track-image' className='size-40 object-cover transition-all ' loading='lazy' />
        ) : (
          <div className='flex size-36 items-center justify-center bg-background transition-all '>
            <h1 className='ml-2 whitespace-nowrap font-major text-lg text-primary'>SOUNDTRACK!</h1>
          </div>
        )}
      </CardHeader>
      <CardContent className='p-2'>
        <CardTitle className='line-clamp-1 select-none text-sm font-semibold text-foreground/90'>{data?.name}</CardTitle>
        <CardDescription className='mt-1 select-none text-xs'>{handleSubTitle(data, data?.type)}</CardDescription>
      </CardContent>
      {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
    </Card>
  )
}

export default TrackCard
