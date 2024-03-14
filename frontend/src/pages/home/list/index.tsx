import TrackCard from '@/components/card/TrackCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
interface ComponentProps {
  title: string
  data: any
}

const List: FC<ComponentProps> = ({ title, data }) => {
  console.log('🚀 ~ data:', data)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const containerRef = useRef<HTMLOListElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        ease: 'linear',
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }
  const handleScroll = (scrollAmount: any) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount

    // Update the state with the new scroll position
    setScrollPosition(newScrollPosition < 0 ? 0 : newScrollPosition)

    if (containerRef.current) {
      containerRef.current.scrollLeft = newScrollPosition < 0 ? 0 : newScrollPosition
    }
  }
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='mb-4 text-xl font-bold capitalize'>{title}</h1>
        <div className='hidden space-x-4 md:flex'>
          <ChevronLeft className='cursor-pointer' onClick={() => handleScroll(-700)} />
          <ChevronRight className='cursor-pointer' onClick={() => handleScroll(700)} />
        </div>
      </div>
      <motion.ol
        variants={container}
        initial='hidden'
        animate={isInView ? 'show' : ''}
        className='no-scrollbar flex w-full snap-x space-x-6 overflow-x-scroll scroll-smooth'
        ref={containerRef}
      >
        {data?.[title]?.map((list: any, index: number) => (
          <motion.li variants={item} key={index} className='my-2'>
            <TrackCard data={list} type={title} />
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}

export default List
