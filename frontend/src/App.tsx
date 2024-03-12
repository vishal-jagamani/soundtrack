import React, { Suspense, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './routes'
import LoadingSpinner from './components/loader/LoadingSpinner'
import { ThemeProvider } from './components/theme-provider'
import { useGetRequestQuery } from './contexts/api/authApiService'
import { useAuth } from './utils/hof/AuthContext'

export const App: React.FC = () => {
  const { data: AuthUser } = useGetRequestQuery('/user')

  const { setUserEncrypted } = useAuth()

  useEffect(() => {
    if (AuthUser?.data) setUserEncrypted(AuthUser?.data)
  }, [AuthUser])

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
