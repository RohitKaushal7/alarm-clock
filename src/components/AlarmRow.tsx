import { FunctionComponent } from 'react'

import { addMinutes, format } from 'date-fns'
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
      {alarm.snooze > 0 && (
        <div className="mt-2 text-xs text-yellow-500">
          ⏱️ Snoozed +{alarm.snooze} mins. Will ring again at{' '}
          {format(addMinutes(time, alarm.snooze), 'HH:mm')}.
        </div>
      )}
      {alarm.title && (
        <div className="mt-2 text-sm text-neutral-600">{alarm.title}</div>
      )}
    </div>
  )
}

export default AlarmRow

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
