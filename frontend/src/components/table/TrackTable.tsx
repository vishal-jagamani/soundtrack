import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { Heart, MoreHorizontal, PlayIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router'

interface TrackTableProps {
  tableTile: string
  data: any
}

const TrackTable: React.FC<TrackTableProps> = ({ tableTile, data }) => {
  const navigate = useNavigate()

  const formatTime = (duration: number): string => {
    const minutes = Math.floor(duration / 60000)
    const seconds = ((duration % 60000) / 1000).toFixed(0)
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`
  }

  return (
    <>
      <TableCaption className='flex pb-2 text-2xl font-bold text-foreground'>{tableTile}</TableCaption>
      <Table>
        <TableBody>
          {data &&
            data?.map((row: any, index: number) => (
              <TableRow draggable={false} className='group overflow-x-auto' key={index}>
                <TableCell className='w-10 select-none text-center  transition-all md:w-16'>
                  <div className='flex items-center justify-center'>
                    <p className='group-hover:hidden'>{index + 1}</p>
                    <PlayIcon className='hidden cursor-pointer text-foreground/80 group-hover:block' size={'20'} />
                  </div>
                </TableCell>
                <TableCell className='flex items-center space-x-2 md:space-x-3'>
                  <img src={row?.album?.images?.find((val: any) => val?.height === 64)?.url} alt='' className='size-10 md:size-10' />
                  <p
                    className='font- line-clamp-1 min-w-44 select-none text-sm hover:cursor-pointer hover:underline sm:text-base'
                    onClick={() => navigate(`/track/${row?.id}`)}
                  >
                    {row?.name}
                  </p>
                </TableCell>
                <TableCell className='hidden select-none'>{row?.artists?.map((val: any) => val?.name)?.join(', ')}</TableCell>
                <TableCell className=''>
                  <Heart size={18} className='hover:cursor-pointer' />
                </TableCell>
                <TableCell className='hidden select-none md:table-cell'>{formatTime(row?.durationMs)}</TableCell>
                <TableCell className='px-2'>
                  <MoreHorizontal size={22} className='hover:cursor-pointer' />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TrackTable
