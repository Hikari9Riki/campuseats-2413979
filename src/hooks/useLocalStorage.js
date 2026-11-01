import { useEffect, useState } from 'react'

// Custom hook with the same [value, setValue] shape as useState,
// wrapped with try/catch around JSON.parse and localStorage.setItem.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }, [key, value])

  return [value, setValue]
}