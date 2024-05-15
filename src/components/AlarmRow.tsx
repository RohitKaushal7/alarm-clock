import { FunctionComponent } from 'react'

import { format } from 'date-fns'
import { Alarm } from 'lib/alarm-clock'

interface AlarmRowProps {
  alarm: Alarm
  onClick?: (id: string) => void
}

const AlarmRow: FunctionComponent<AlarmRowProps> = ({ alarm, onClick }) => {
  const time = new Date()
  time.setHours(alarm.hour)
  time.setMinutes(alarm.minute)
  return (
    <div
      className="cursor-pointer rounded-lg bg-neutral-900 p-4"
      onClick={() => onClick?.(alarm.id)}
    >
      <div className="text-3xl font-bold">{format(time, 'HH:mm')}</div>
      <div className="mt-1 text-xs text-neutral-400">
        {WEEKDAYS.filter((_, index) => alarm.weekdays[index]).join(', ')}
      </div>
    </div>
  )
}

export default AlarmRow

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
