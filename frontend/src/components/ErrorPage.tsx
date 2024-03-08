import { Link, useRouteError } from 'react-router-dom'
import { Button } from './ui/button'
import React from 'react'

interface RouteError {
  error?: 'number'
  message?: 'string'
}

const ErrorPage: React.FC = () => {
  const routeError = useRouteError()
  const { error, message }: RouteError = routeError as RouteError
  return (
    <main className='grid min-h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8 '>
      <div className='text-center'>
        <p className='text-base font-semibold text-primary'>{error ?? '500'}</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl'>Oops something went wrong</h1>
        <p className='mt-6 text-base uppercase leading-7 text-gray-600 dark:text-gray-400'>{message}</p>
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
