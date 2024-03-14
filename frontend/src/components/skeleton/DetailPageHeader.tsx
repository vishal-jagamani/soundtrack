import { FC } from 'react'
import { Skeleton } from '../ui/skeleton'

interface DetailPageHeaderProps {
  loading: Boolean
}

const DetailPageHeader: FC<DetailPageHeaderProps> = ({ loading }) => {
  return loading ? (
    <div className='flex flex-col items-center  space-y-4 md:flex-row md:items-end md:space-x-4'>
      <Skeleton className='size-56 object-cover' />
      <div className='flex flex-col items-center space-y-4 md:items-start'>
        <Skeleton className='hidden h-16 w-56 md:block md:w-96 ' />
        <Skeleton className='h-5 w-56 md:w-96 ' />
        <Skeleton className='h-8 w-1/2 md:w-60' />
        {/* <p className='flex select-none items-center text-lg text-muted-foreground'>
                <Users size={30} className='mr-2 text-primary' />
                {formatNumber(artistData?.followers?.total)}
              </p> */}
      </div>
      <div></div>
    </div>
  ) : null
}

export default DetailPageHeader
