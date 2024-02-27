import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
interface TrackCardProps {
  data: any
}

const TrackCard: FC<TrackCardProps> = ({ data }) => {
  const IMAGE = data?.images?.[1]
  return (
    <Card className='bg-background-highlight min-w-36 cursor-pointer snap-start border-none transition-all hover:bg-muted md:min-w-40'>
      <CardHeader className='space-y-4 p-2'>
        {IMAGE?.url ? (
          <img src={IMAGE?.url} alt='Track-image' className='h-36 object-cover  ' />
        ) : (
          <div className='flex h-36 items-center justify-center bg-background'>
            <h1 className='font-major ml-2 whitespace-nowrap text-lg text-primary'>SOUNDTRACK!</h1>
          </div>
        )}
        <div>
          <CardTitle className='line-clamp-1'>{data?.name}</CardTitle>
          <CardDescription className='mt-2 text-xs'>{data?.releaseDate?.split('-')[0]}</CardDescription>
        </div>
      </CardHeader>
      {/* <CardContent>
          <p>Card Content</p>
        </CardContent> */}
      {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
    </Card>
  )
}

export default TrackCard
