// AuthContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import { CRYPTO_SECRET } from '../constant'

interface AuthContextProps {
  setUserEncrypted: (token: string | null) => void
  user: any
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userEncrypted, setUserEncrypted] = useState<string | null>(window.localStorage.getItem('userDetails'))
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    if (userEncrypted?.length) {
      const DECRYPT = CryptoJS.AES.decrypt(userEncrypted?.toString(), CRYPTO_SECRET)?.toString(CryptoJS.enc.Utf8)
      setUser(JSON.parse(DECRYPT))
    }
  }, [userEncrypted])

  return <AuthContext.Provider value={{ user, setUserEncrypted }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
