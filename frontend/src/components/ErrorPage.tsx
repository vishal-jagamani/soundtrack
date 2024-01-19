import { Link, useRouteError } from 'react-router-dom'
import { Button } from './ui/button'
import React from 'react'

// type errorType = {
//   errorCode: "number";
//   errorMessage: "string";
// };

const ErrorPage: React.FC = () => {
  const error = useRouteError()
  console.log('🚀 ~ error:', error)
  return (
    <main className='grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-black'>
      <div className='text-center'>
        <p className='text-base font-semibold text-orange-600'>{}</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>Page not found</h1>
        <p className='mt-6 text-base leading-7 text-gray-600 dark:text-gray-400'>{}</p>
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

export default ErrorPage
