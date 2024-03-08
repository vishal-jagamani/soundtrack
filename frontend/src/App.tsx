import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './routes'
import LoadingSpinner from './components/loader/LoadingSpinner'
import { ThemeProvider } from './components/theme-provider'
import { useGetRequestQuery } from './contexts/api/authApiService'

export const App: React.FC = () => {
  const { data: AuthUser } = useGetRequestQuery('/user')
  console.log('🚀 ~ AuthUser:', AuthUser)

  return (
    <AnimatePresence mode='wait'>
      <Suspense fallback={<LoadingSpinner />}>
        <ThemeProvider defaultTheme='dark' storageKey='soundtrack-ui-theme'>
          {/* <Layout> */}
          <RouterProvider router={router} />
          {/* </Layout> */}
        </ThemeProvider>
      </Suspense>
    </AnimatePresence>
  )
}

export default App
