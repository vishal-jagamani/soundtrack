import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
interface TrackCardProps {
  data: any
}

const TrackCard: FC<TrackCardProps> = ({ data }) => {
  console.log('🚀 ~ data:', data)
  const IMAGE = data?.images?.[1]
  return (
    <>
      <Card className='hover:bg-accent bg-background-highlight cursor-pointer transition-all min-w-40 border-none'>
        <CardHeader className='space-y-4 p-2'>
          <img src={IMAGE?.url} alt='Track-image' className='h-36 object-cover' />
          <div>
            <CardTitle className='line-clamp-1'>{data?.name}</CardTitle>
            <CardDescription className='text-xs mt-2'>{data?.releaseDate?.split('-')[0]}</CardDescription>
          </div>
        </CardHeader>
        {/* <CardContent>
          <p>Card Content</p>
        </CardContent> */}
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </>
  )
}

export default TrackCard
