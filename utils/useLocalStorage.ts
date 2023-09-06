import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initValue: T):[T, any] {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue === null) {
      return initValue
    } else {
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}