import { FC } from 'react'
import { Skeleton } from '../ui/skeleton'

interface TableSkeletonProps {
  loading: Boolean
}

const TableSkeleton: FC<TableSkeletonProps> = ({ loading }) => {
  return (
    loading && (
      <div>
        <div className='mt-8'>
          {Array.from(Array(5).keys())?.map((_, i) => <Skeleton className='mt-2 flex h-9 items-center md:space-x-3' key={i} />)}
        </div>
      </div>
    )
  )
}

export default TableSkeleton
