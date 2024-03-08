import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC, useRef } from 'react'
import { useParams } from 'react-router'
import { motion, useInView } from 'framer-motion'
import TrackCard from '@/components/card/TrackCard'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const TopTracks: FC = () => {
  const PARAMS = useParams()
  const { data: TopTracksData, isLoading: TopTracksIsLoading } = useGetRequestQuery(`/artists/${PARAMS?.id}/topTracks?market=US`)
  console.log('🚀 ~ TopTracksData:', TopTracksData, TopTracksIsLoading)
  const containerRef = useRef<HTMLOListElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  }

  const formatTime = (duration: number): string => {
    const minutes = Math.floor(duration / 60000)
    const seconds = ((duration % 60000) / 1000).toFixed(0)
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className='py-4'>
      {/* <motion.ol
        variants={container}
        initial='hidden'
        animate={isInView ? 'show' : ''}
        className='no-scrollbar flex w-full snap-x space-x-6 overflow-scroll scroll-smooth'
        ref={containerRef}
      >
        {TopTracksData?.data?.tracks?.map((list: any, index: number) => (
          <motion.li variants={item} key={index}>
            <TrackCard data={list} type={'tracks'} />
          </motion.li>
        ))}
      </motion.ol> */}
      <TableCaption className='flex text-2xl font-bold'>Popular Tracks</TableCaption>
      <Table>
        {/* <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableBody>
          {TopTracksData?.data?.tracks?.map((row: any, index: number) => (
            // console.log('row', row)
            <TableRow>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>
                <img src={row?.images} alt='' />
                {row?.name}
              </TableCell>
              <TableCell>{row?.artists?.map((val: any) => val?.name)?.join(', ')}</TableCell>
              <TableCell className='text-right'>{formatTime(row?.duration_ms)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TopTracks
