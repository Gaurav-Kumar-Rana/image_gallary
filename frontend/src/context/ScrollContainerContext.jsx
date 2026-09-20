import { createContext, useContext, useRef } from 'react'

const ScrollContainerContext = createContext(null)

export function ScrollContainerProvider({ children }) {
  const containerRef = useRef(null)
  return (
    <ScrollContainerContext.Provider value={containerRef}>
      {children}
    </ScrollContainerContext.Provider>
  )
}

export function useScrollContainerRef() {
  const ref = useContext(ScrollContainerContext)
  if (!ref) {
    throw new Error('useScrollContainerRef must be used within a ScrollContainerProvider')
  }
  return ref
}
