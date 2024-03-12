import React, { useEffect, useState } from 'react'
import { useVerifyUserTokenQuery } from '../../../contexts/xhr/generalApiService'
import { useDispatch, useSelector } from 'react-redux'
import { authDetails } from '../../../contexts/reducers/versionControl'
export const useVerifyToken = (keyName, defaultValue) => {
  const authData = useSelector(state => state?.marketoDetails?.userDetails)
  const [querySkip, setQuerySkip] = useState(false)

  const { data: tokenData, refetch } = useVerifyUserTokenQuery(`/backend/verifyUserToken?token=${authData?.data?.token}`, {
    refetchOnMountOrArgChange: true,
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (tokenData?.status && querySkip) {
      localStorage.setItem('user', JSON.stringify(tokenData))
      dispatch(authDetails({ data: { ...tokenData }, loading: false }))
    } else if (tokenData?.hasOwnProperty('status') && !tokenData?.status) {
      dispatch(authDetails({ data: { ...tokenData }, loading: false }))
    }
  }, [tokenData])

  const VerifyToken = () => {
    setQuerySkip(true)
    refetch()
    setTimeout(() => {
      setQuerySkip(false)
    }, 10000)
  }
  return [VerifyToken]
}
