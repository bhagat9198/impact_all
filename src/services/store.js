import create from 'zustand'

const userStore = create((set) => ({
  userAuthenticated: false,
  userDetails: {},
  updateAuthState: (authState) => set(state => ({
    ...state,
    userAuthenticated: authState,
  })),
  updateUserDetails: (userData) => set(state => ({
    ...state,
    userDetails: userData
  }))
}))

export const useUserStore = userStore;
