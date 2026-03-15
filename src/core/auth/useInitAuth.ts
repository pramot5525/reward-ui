import { useEffect } from 'react'
import { useAuthStateStore } from '../store/authStateStore'

export const useInitAuth = () => {
  const { onGotUser, onUnAuthorized } = useAuthStateStore()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(async (res) => {
        if (res.ok) {
          const data = (await res.json()) as { username: string }
          onGotUser({ name: data.username })
        } else {
          onUnAuthorized()
        }
      })
      .catch(() => onUnAuthorized())
  }, [onGotUser, onUnAuthorized])
}
