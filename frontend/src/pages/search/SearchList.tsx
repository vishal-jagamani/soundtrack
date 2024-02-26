import TrackCard from '@/components/card/TrackCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FC, useRef, useState } from 'react'

interface ComponentProps {
  title: string
  data: any
}

const SearchList: FC<ComponentProps> = ({ title, data }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

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
        <h1 className='mb-4 capitalize'>{title}</h1>
        <div className='flex space-x-4'>
          <ChevronLeft className='cursor-pointer' onClick={() => handleScroll(-700)} />
          <ChevronRight className='cursor-pointer' onClick={() => handleScroll(700)} />
        </div>
      </div>
      <div className='no-scrollbar flex w-full snap-x space-x-6 overflow-scroll scroll-smooth' ref={containerRef}>
        {data?.[title]?.items?.map((item: any) => <TrackCard data={item} />)}
      </div>
    </div>
  )
}

export default SearchList
