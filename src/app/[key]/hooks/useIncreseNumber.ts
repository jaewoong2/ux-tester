import { useLayoutEffect, useState } from 'react'

function sleep(ms?: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms ?? 30)
  })
}

const useIncreseNumber = (target: number, ms?: number) => {
  const [number, setNumber] = useState(0)

  useLayoutEffect(() => {
    if (number < target) {
      requestAnimationFrame(async () => {
        await sleep(ms)
        setNumber((prev) => prev + 1)
      })
    }
  }, [number, target, ms])

  return number
}

export default useIncreseNumber
