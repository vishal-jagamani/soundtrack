import TrackCard from '@/components/card/TrackCard'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { motion, useInView } from 'framer-motion'
import { FC, useRef, useState } from 'react'
import { useParams } from 'react-router'

const Albums: FC = () => {
  const PARAMS = useParams()
  const containerRef = useRef<HTMLOListElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const { data: AlbumsData } = useGetRequestQuery(`/artists/${PARAMS?.id}/albums`)

  const albumType = ['All', 'Albums', 'Singles and EPs']
  const [selectedAlbumType, setSelectedAlbumType] = useState('All')

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <h1 className='text-2xl font-bold text-foreground'>Albums</h1>
      <div className='my-4 flex space-x-2'>
        {albumType?.map((val: string) => (
          <p
            className={`border px-4 py-1 text-sm opacity-100 hover:cursor-pointer  ${selectedAlbumType === val ? `bg-primary` : ``}`}
            onClick={() => setSelectedAlbumType(val)}
          >
            {val}
          </p>
        ))}
      </div>
      <motion.ol
        variants={container}
        initial='hidden'
        animate={isInView ? 'show' : ''}
        className='no-scrollbar flex w-full snap-x space-x-6 overflow-scroll scroll-smooth'
        ref={containerRef}
      >
        {AlbumsData?.data?.items?.map((list: any, index: number) => (
          <motion.li variants={item} key={index}>
            <TrackCard data={list} type={list?.type} />
          </motion.li>
        ))}
      </motion.ol>
    </>
  )
}

export default Albums
