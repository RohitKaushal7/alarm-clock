import { FunctionComponent, useEffect, useState } from 'react'

import { format } from 'date-fns'

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
    <div className="w-full py-3">
      <span className="text-3xl font-bold">{format(time, 'HH:mm')}</span>
      <span className="ml-1 text-2xl font-semibold text-neutral-500">
        {format(time, ' ss')}
      </span>
    </div>
  )
}

export default Clock
