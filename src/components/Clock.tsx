import { FunctionComponent, useEffect, useState } from 'react'

interface ClockProps {}

const Clock: FunctionComponent<ClockProps> = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div className="py-3">
      <h1 className="text-3xl font-bold">{time.toLocaleTimeString()}</h1>
    </div>
  )
}

export default Clock
