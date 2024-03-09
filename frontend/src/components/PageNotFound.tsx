import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const PageNotFound = () => {
  return (
    <main className='grid min-h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-primary'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl'>Page not found</h1>
        <p className='mt-6 text-base leading-7 text-gray-600 dark:text-gray-400'>Sorry, we couldn’t find the page you’re looking for.</p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link to={'/'}>
            <Button>Go back home</Button>
          </Link>
          <a href='#' className='text-sm font-semibold text-gray-900 dark:text-white'>
            Contact support <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}

export default PageNotFound
