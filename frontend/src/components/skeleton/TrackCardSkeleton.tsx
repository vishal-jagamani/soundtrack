import { cn } from '@/lib/utils'
import { FC } from 'react'
import { Skeleton } from '../ui/skeleton'

interface TrackSkeletonProps {
  loading: Boolean
  length: number
  className?: any
}

const TrackCardSkeleton: FC<TrackSkeletonProps> = ({ loading, length, className }) => {
  return (
    <>
      {loading && (
        <div className={cn('space-y-16', className)}>
          {Array.from(Array(length).keys())?.map((_, i) => (
            <div className='overflow-auto'>
              <Skeleton className='mb-5 h-6 w-52' />
              <div className='flex space-x-7 overflow-scroll' key={i}>
                {Array.from(Array(6).keys())?.map((_, i) => <Skeleton className='h-52 w-40' key={i} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TrackCardSkeleton
