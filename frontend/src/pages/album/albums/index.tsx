import TrackCard from '@/components/card/TrackCard'
import { useGetRequestQuery } from '@/contexts/api/soundtrackApiService'
import { AlbumType, ArtistType } from '@/utils/types/type'
import { motion, useInView } from 'framer-motion'
import { FC, useRef, useState } from 'react'
import { useParams } from 'react-router'

interface AlbumProps {
  artist: ArtistType
}

const Albums: FC<AlbumProps> = ({ artist }) => {
  const PARAMS = useParams()
  const containerRef = useRef<HTMLOListElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const { data: AlbumsData } = useGetRequestQuery(`/artists/${artist?.id}/albums`)
  const [selectedAlbumType, setSelectedAlbumType] = useState('All')

  const FILTERED_ALBUM_DATA = AlbumsData?.data?.items?.filter((album: AlbumType) => album.id != PARAMS?.id)
  const albumType = ['All', 'Albums', 'Singles and EPs']

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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <h1 className='mt-6 text-2xl font-bold text-foreground'>More from {artist?.name}</h1>
      <div className='my-4 flex space-x-2'>
        {albumType?.map((val: string) => (
          <p
            className={`border px-4 py-1 text-sm opacity-100 hover:cursor-pointer  ${selectedAlbumType === val ? `bg-primary` : ``}`}
            onClick={() => setSelectedAlbumType(val)}
            key={val}
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
        {FILTERED_ALBUM_DATA?.map((list: AlbumType, index: number) => (
          <motion.li variants={item} key={index}>
            <TrackCard data={list} type={list?.type} />
          </motion.li>
        ))}
      </motion.ol>
    </>
  )
}

export default Albums
