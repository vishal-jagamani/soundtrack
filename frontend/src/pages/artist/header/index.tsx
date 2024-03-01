import { Skeleton } from '@/components/ui/skeleton'
import { Users } from 'lucide-react'
import { FC } from 'react'

interface HeaderProps {
  data: any
  dataLoading: boolean
}

const Header: FC<HeaderProps> = ({ data, dataLoading }) => {
  function formatNumber(value: number): string {
    if (value < 1e3) {
      return value.toString()
    } else if (value < 1e6) {
      return (value / 1e3).toFixed(1) + 'K'
    } else if (value < 1e9) {
      return (value / 1e6).toFixed(1) + 'M'
    } else {
      return (value / 1e9).toFixed(1) + 'B'
    }
  }
  return (
    <>
      {dataLoading && (
        <div className='flex items-end space-x-5'>
          <Skeleton className='size-48 object-cover md:size-72' />
          <div className='space-y-4'>
            <Skeleton className='h-24 w-56 md:w-96 ' />
            <Skeleton className='h-10 w-1/2 md:w-60' />
            {/* <p className='flex select-none items-center text-lg text-muted-foreground'>
                <Users size={30} className='mr-2 text-primary' />
                {formatNumber(artistData?.followers?.total)}
              </p> */}
          </div>
          <div></div>
        </div>
      )}
      {data && (
        <div className='flex flex-row items-end space-x-4 space-y-4 md:items-end'>
          <img src={data?.images?.[0]?.url} draggable={false} className='size-48 border-4 border-primary object-cover md:size-72' />
          <div className='space-y-4'>
            <h1 className='line-clamp-2 select-none text-[2.5rem] font-bold md:text-8xl'>{data?.name}</h1>
            <p className='flex select-none items-center text-lg text-muted-foreground'>
              <Users size={30} className='mr-2 text-primary' />
              {formatNumber(data?.followers?.total)}
            </p>
          </div>
          <div></div>
        </div>
      )}
    </>
  )
}

export default Header
