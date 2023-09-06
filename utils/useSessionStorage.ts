import { useEffect, useState } from 'react'

export function useSessionStorage<T>(key: string, initValue: T):[T, any] {
  const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(key)
    if (jsonValue === null) {
      return initValue
    } else {
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}