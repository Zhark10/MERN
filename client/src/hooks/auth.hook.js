import {useState, useCallback} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id)=>{
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
        userId, token
    }))
  }, [])

  const logout = useCallback(()=>{
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  return {login, logout, token, userId}
}