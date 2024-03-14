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
            <div>
              <Skeleton className='mb-5 h-6 w-52' />
              <div className='flex space-x-7' key={i}>
                {Array.from(Array(6).keys())?.map((_, i) => <Skeleton className='size-40 h-52' key={i} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TrackCardSkeleton
