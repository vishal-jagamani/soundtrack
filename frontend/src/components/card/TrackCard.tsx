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
  return (
    <Card
      className='group min-w-36 cursor-pointer snap-start overflow-hidden border-none transition-all hover:bg-muted md:min-w-40'
      onClick={() => handleNavigate()}
    >
      <CardHeader className='space-y-4 p-2'>
        {priorityImage?.url ? (
          <img
            src={priorityImage?.url}
            alt='Track-image'
            className='h-36 object-cover transition-all group-hover:scale-110'
            loading='lazy'
          />
        ) : (
          <div className='flex size-36 items-center justify-center bg-background transition-all group-hover:scale-110'>
            <h1 className='ml-2 whitespace-nowrap font-major text-lg text-primary'>SOUNDTRACK!</h1>
          </div>
        )}
      </CardHeader>
      <CardContent className='p-2'>
        <CardTitle className='line-clamp-1 select-none text-sm font-normal text-foreground/90'>{data?.name}</CardTitle>
        <CardDescription className='mt-1 select-none text-xs'>{data?.releaseDate?.split('-')?.[0]}</CardDescription>
      </CardContent>
      {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
    </Card>
  )
}

export default TrackCard
