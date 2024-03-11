import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { logout } from '@/pages/auth/slice/authSlice'
export const useLocalStorage = (keyName: string) => {
  // const dispatch = useDispatch()
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      const parsedData = value ?? null
      if (parsedData) {
        // dispatch(loginSuccess(parsedData))
        return parsedData
      }
    } catch (err) {
      return null
    }
  })
  const setValue = (newValue: any) => {
    if (newValue === 'logout') {
      window.localStorage.clear()
      // dispatch(logout())
    } else {
      try {
        window.localStorage.setItem(keyName, newValue)
        // dispatch(loginSuccess(newValue))
        setStoredValue(newValue)
      } catch (err) {}
    }
  }

  return [storedValue, setValue]
}
