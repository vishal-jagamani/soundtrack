import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { FC, useRef } from 'react'
import { useParams } from 'react-router'
import { motion, useInView } from 'framer-motion'
import TrackCard from '@/components/card/TrackCard'

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
  return (
    <div className='mt-6'>
      <motion.ol
        variants={container}
        initial='hidden'
        animate={isInView ? 'show' : ''}
        className='no-scrollbar flex w-full snap-x space-x-6 overflow-scroll scroll-smooth'
        ref={containerRef}
      >
        {TopTracksData?.data?.map((list: any, index: number) => (
          <motion.li variants={item} key={index}>
            <TrackCard data={list} type={'tracks'} />
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}

export default TopTracks
