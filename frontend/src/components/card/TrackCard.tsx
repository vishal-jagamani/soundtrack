import PATTERN_IMAGE from '@/assets/images/sign_up_pattern.png'
import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
const TrackCard: FC = () => {
  return (
    <>
      <Card className='hover:bg-accent bg-background-highlight cursor-pointer transition-all'>
        <CardHeader className='space-y-4'>
          <img src={PATTERN_IMAGE} alt='Track-image' className='h-28' />
          <div>
            <CardTitle>Hot Daily Mix</CardTitle>
            <CardDescription className='text-xs mt-2'>Hottest Hindi music served here. Cover - Animal</CardDescription>
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
