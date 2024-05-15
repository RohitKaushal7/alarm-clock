import { FunctionComponent } from 'react'

import { WeekDays } from 'lib/alarm-clock'
import { cn } from 'lib/utils'

interface WeekDaysPickerProps {
  weekdays: WeekDays
  onChange: (weekdays: WeekDays) => void
}

const WeekDaysPicker: FunctionComponent<WeekDaysPickerProps> = ({
  weekdays,
  onChange,
}) => {
  return (
    <div className="flex gap-2 self-center px-2 py-1">
      {WEEKDAYS.map((day, index) => (
        <div
          key={day + index}
          onClick={() => {
            const newWeekdays = [...weekdays] as WeekDays
            newWeekdays[index] = !weekdays[index]
            const allFalse = newWeekdays.every((x) => x === false)
            if (allFalse) {
              newWeekdays[new Date().getDay()] = true
            }
            onChange(newWeekdays)
          }}
          className={cn(
            'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-bold outline outline-1 outline-neutral-600',
            {
              'bg-primary': weekdays[index],
            }
          )}
        >
          {day}
        </div>
      ))}
    </div>
  )
}

export default WeekDaysPicker

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
