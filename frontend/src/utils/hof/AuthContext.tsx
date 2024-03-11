// AuthContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import { CRYPTO_SECRET } from '../constant'

interface AuthContextProps {
  setUser: (token: string | null) => void
  userDetails: any
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(window.localStorage.getItem('userDetails'))
  const [userDetails, setUserDetails] = useState<any>({})

  useEffect(() => {
    if (user?.length) {
      const DECRYPT = CryptoJS.AES.decrypt(user?.toString(), CRYPTO_SECRET)?.toString(CryptoJS.enc.Utf8)
      // const DECRYPT_DATA = DECRYPT
      setUserDetails(JSON.parse(DECRYPT))
    }
  }, [user])

  return <AuthContext.Provider value={{ userDetails, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
