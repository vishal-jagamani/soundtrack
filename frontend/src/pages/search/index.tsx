import { Input } from '@/components/ui/input'
import { useSearchInputMutation } from '@/contexts/api/soundtrackApiService'
import useDebounce from '@/utils/customHooks/useDebounce'
import { FC, useEffect, useMemo, useState } from 'react'
import SearchContainer from './SearchList'
interface SearchResponse {
  [key: string]: any
}

const Search: FC = () => {
  const [searchText, setSearchText] = useState<string>('camila')
  const [searchResponse, setSearchResponse] = useState<SearchResponse>({})
  console.log('🚀 ~ searchResponse:', searchResponse)

  const SEARCH_HEADER_TITLE_CASE = useMemo(() => {
    return Object?.keys(searchResponse ?? {})
  }, [searchResponse])

  const [SearchInput, { isLoading }] = useSearchInputMutation()

  const debouncedSearchTerm = useDebounce(searchText, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchText(newSearchTerm)
  }

  const fetchData = async (searchTerm: string) => {
    try {
      const response = await SearchInput({ searchText: searchTerm ?? searchText })?.unwrap()
      setSearchResponse(response?.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <div className='wrapper-container space-y-6 '>
      {/* Search */}
      <Input type='text' placeholder='Search' onChange={e => handleChange(e)} />
      <>
        {isLoading ? (
          <div className='grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible'>
            <div
              className='h-12 w-12 animate-spin rounded-full
                    border-2 border-solid border-primary border-t-transparent'
            />
          </div>
        ) : null}
        <div className='space-y-8'>
          {!isLoading &&
            SEARCH_HEADER_TITLE_CASE?.map((title, index) => {
              return <SearchContainer data={searchResponse} title={title} key={index} />
            })}
        </div>
      </>
    </div>
  )
}

export default Search
