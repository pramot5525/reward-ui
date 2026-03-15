import { create } from 'zustand'

export type AuthState = 'init' | 'no-auth' | 'logged-in'

export type UseAuthStateUser = {
  name?: string
}

export type AuthStateStore = {
  authState: AuthState
  user?: UseAuthStateUser
  onUnAuthorized: () => void
  onGotUser: (user: UseAuthStateUser) => void
}

export const useAuthStateStore = create<AuthStateStore>((set) => ({
  authState: 'init',
  onGotUser: (user: UseAuthStateUser) => set({ user, authState: 'logged-in' }),
  onUnAuthorized: () => set({ user: undefined, authState: 'no-auth' }),
}))
