import { FunctionComponent, useEffect, useRef, useState } from 'react'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { TimePickerInput } from 'components/ui/time-picker'
import WeekDaysPicker from 'components/ui/weekdays-picker'

import { useAppContext } from 'context/app'
import { addMinutes } from 'date-fns'
import { WeekDays } from 'lib/alarm-clock'
import { Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

interface AlarmEditProps {}

const AlarmEdit: FunctionComponent<AlarmEditProps> = () => {
  let { id } = useParams()
  if (id == 'new') id = undefined
  const navigate = useNavigate()

  const { alarmClock } = useAppContext()

  const alarm = alarmClock.getAlarmById(id!)

  const alarmTime = new Date()
  alarmTime.setHours(alarm?.hour || 0)
  alarmTime.setMinutes(alarm?.minute || 0)

  const [date, setDate] = useState<Date | undefined>(alarmTime)
  const [title, setTitle] = useState<string>(alarm?.title || '')
  const [weekdays, setWeekdays] = useState<WeekDays>(
    alarm?.weekdays || [false, false, false, false, false, false, false]
  )

  useEffect(() => {
    if (!id) {
      // New Alarm
      const now = addMinutes(new Date(), 1)
      setDate(now)
      const weekdays = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ] as WeekDays
      weekdays[now.getDay()] = true
      setWeekdays(weekdays)
    }
  }, [id])

  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    alarmClock.setAlarm({
      id,
      title,
      hour: date?.getHours() || 0,
      minute: date?.getMinutes() || 0,
      weekdays,
    })
    navigate('/')
  }

  const handleDelete = () => {
    alarmClock.deleteAlarm(id!)
    navigate('/')
  }

  return (
    <div className="relative mx-auto flex  min-h-screen max-w-2xl flex-col p-4">
      <h1 className="mt-16 text-3xl">Edit Alarm</h1>
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 p-4 py-8 text-3xl">
        <div className="flex w-full items-center justify-center gap-4 text-3xl">
          <TimePickerInput
            className="text-3xl font-bold"
            picker="hours"
            date={date}
            setDate={setDate}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
          />
          <div>:</div>
          <TimePickerInput
            className="text-3xl font-bold"
            picker="minutes"
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
          />
        </div>
        <div className="mt-8 w-full">
          <Input
            className="w-full border-none text-center outline-none"
            placeholder="Alarm Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col gap-4 rounded-lg bg-neutral-900 p-4">
        <div className="font-semibold">Repeat</div>
        <WeekDaysPicker weekdays={weekdays} onChange={setWeekdays} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button variant="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Done</Button>
      </div>
      {id && (
        <div className="absolute bottom-5 left-0 grid w-full justify-self-end p-4">
          <Button variant="secondary" onClick={handleDelete}>
            <Trash2 className="mr-1.5 h-5" /> Delete
          </Button>
        </div>
      )}
    </div>
  )
}

export default AlarmEdit
