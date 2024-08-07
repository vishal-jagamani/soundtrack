import TrackCardSkeleton from '@/components/skeleton/TrackCardSkeleton'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSearchInputMutation } from '@/contexts/api/soundtrackApiService'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { z } from 'zod'
import List from './list'
interface SearchResponse {
  [key: string]: any
}

const FormSchema = z.object({
  search: z.string().min(3, {
    message: 'Search text must be at least 3 characters.',
  }),
})

const Search: FC = () => {
  const navigate = useNavigate()
  const PARAMS = useParams()
  const searchText = PARAMS?.searchText ?? ''
  const [searchResponse, setSearchResponse] = useState<SearchResponse>({})
  const [SearchInput, { isLoading }] = useSearchInputMutation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    navigate({
      pathname: `/search/${data?.search}`,
    })
  }

  const SEARCH_HEADER_TITLE_CASE = useMemo(() => {
    return Object?.keys(searchResponse ?? {})
  }, [searchResponse])

  // const debouncedSearchTerm = useDebounce(decodeURIComponent(tempSearchText), 800)

  const fetchData = async (searchTerm: string) => {
    try {
      const response = await SearchInput({ searchText: searchTerm ?? searchText })?.unwrap()
      setSearchResponse(response?.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData(searchText)
  }, [searchText])

  return (
    <div className='wrapper-container space-y-6 '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <FormField
            control={form.control}
            name='search'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Search Text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='hidden'>
            Submit
          </Button>
        </form>
      </Form>
      <>
        <TrackCardSkeleton loading={isLoading} length={3} />

        {!isLoading &&
          SEARCH_HEADER_TITLE_CASE?.map((title, index) => {
            return (
              <div className='mt-8 space-y-8'>
                <List data={searchResponse} title={title} key={index} />
              </div>
            )
          })}
      </>
    </div>
  )
}

export default Search
