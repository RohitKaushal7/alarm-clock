import { FunctionComponent, useEffect, useState } from 'react'

import AlarmRow from 'components/AlarmRow'
import { Button } from 'components/ui'
import Clock from 'components/ui/Clock'

import { useAppContext } from 'context/app'
import { Alarm } from 'lib/alarm-clock'
import { Link } from 'react-router-dom'

interface IndexRouteProps {}

const IndexRoute: FunctionComponent<IndexRouteProps> = () => {
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const { alarmClock } = useAppContext()
  const [alarms, setAlarms] = useState<Alarm[]>(alarmClock.getAlarms())

  useEffect(() => {
    const unsubscribe = alarmClock.onInterval((_, alarm) => {
      if (alarm) {
        setActiveAlarm(alarm)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [alarms, alarmClock])

  const addAlarm = () => {
    const alarmTime = new Date()
    alarmTime.setMinutes(alarmTime.getMinutes() + 1)
    alarmClock.setAlarm({
      hour: alarmTime.getHours(),
      minute: alarmTime.getMinutes(),
      weekdays: [true, true, true, true, true, true, true],
    })
    setAlarms(alarmClock.getAlarms())
  }

  const handleStopAlarm = () => {
    if (!activeAlarm) return
    alarmClock.stopAlarm(activeAlarm.id)
    setActiveAlarm(null)
  }
  const handleSnoozeAlarm = () => {
    if (!activeAlarm) return
    alarmClock.snoozeAlarm(activeAlarm.id)
    setActiveAlarm(null)
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col p-4">
      <h1 className="mt-16 text-3xl font-bold">Alarm</h1>
      <h1 className="text-xs text-neutral-400">Ring in 10 hours 14 minutes</h1>
      <Clock />
      <div className="py-4">
        <Button onClick={addAlarm}>Add Alarm</Button>
      </div>

      {activeAlarm && (
        <div className="overflow-hidden rounded-lg border-2 border-accent">
          <AlarmRow alarm={activeAlarm} />
          <div className="grid grid-cols-2">
            <Button onClick={handleStopAlarm}>Stop</Button>
            {alarmClock.maxSnoozeMinutes >=
              activeAlarm.snooze + alarmClock.snoozeInterval && (
              <Button onClick={handleSnoozeAlarm}>Snooze</Button>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 py-4">
        {alarms.map((alarm) => (
          <Link to={`alarm/${alarm.id}`}>
            <AlarmRow alarm={alarm} key={alarm.id} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default IndexRoute
