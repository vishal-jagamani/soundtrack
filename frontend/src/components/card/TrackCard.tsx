import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useNavigate } from 'react-router'
interface TrackCardProps {
  data: any
  type: string
}

const TrackCard: FC<TrackCardProps> = ({ data, type }) => {
  const navigate = useNavigate()
  const IMAGE = data?.images?.[1]

  const handleNavigate = () => {
    if (type === 'artists') navigate(`/artist/${data?.id}`)
  }
  return (
    <Card
      className='bg-background-highlight min-w-36 cursor-pointer snap-start border-none transition-all hover:bg-muted md:min-w-40'
      onClick={() => handleNavigate()}
    >
      <CardHeader className='space-y-4 p-2'>
        {IMAGE?.url ? (
          <img src={IMAGE?.url} alt='Track-image' className='h-36 object-cover  ' />
        ) : (
          <div className='flex h-36 items-center justify-center bg-background'>
            <h1 className='ml-2 whitespace-nowrap font-major text-lg text-primary'>SOUNDTRACK!</h1>
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
