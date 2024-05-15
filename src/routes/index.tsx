import { FunctionComponent, useEffect, useState } from 'react'

import AlarmRow from 'components/AlarmRow'
import Clock from 'components/Clock'
import { Button } from 'components/ui'

import { useAppContext } from 'context/app'
import { differenceInHours, format, formatRelative } from 'date-fns'
import { Alarm } from 'lib/alarm-clock'
import { AlarmCheck, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'

interface IndexRouteProps {}

const IndexRoute: FunctionComponent<IndexRouteProps> = () => {
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const [nextAlarm, setNextAlarm] = useState<[Alarm, Date] | null>(null)
  const { alarmClock } = useAppContext()
  const [alarms, setAlarms] = useState<Alarm[]>(alarmClock.getAlarms())

  useEffect(() => {
    const unsubscribe = alarmClock.onInterval((_, alarm) => {
      if (alarm) {
        setActiveAlarm(alarm)
      }
    })

    setNextAlarm(alarmClock.getNextAlarm())

    return () => {
      unsubscribe()
    }
  }, [alarms, alarmClock])

  useEffect(() => {
    if (activeAlarm)
      if (document.hidden) {
        alert('⏱️ Alarm!')
      }
  }, [activeAlarm])

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
    <div className="mx-auto flex max-w-2xl flex-col p-4">
      <h1 className="mt-16 text-3xl font-bold">Alarm</h1>
      {nextAlarm && (
        <h1 className="text-xs text-neutral-400">
          Next ring {formatRelative(nextAlarm[1], new Date())}
        </h1>
      )}
      <Clock />
      <div className="py-3">
        <Link to="/alarm/new">
          <Button>
            <Plus className="-ml-2 mr-1 h-5" /> New Alarm
          </Button>
        </Link>
      </div>

      {activeAlarm && (
        <div className="z-100 fixed inset-0 flex flex-col items-center justify-end gap-16 overflow-hidden bg-black/80 p-8 py-32 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-16">
            <div className="fap-8 flex flex-col items-center gap-4">
              <AlarmCheck className="mb-8 h-16 w-16 animate-bounce" />
              <div className="flex text-5xl">
                <div className="font-bold">
                  {activeAlarm.hour} :{' '}
                  {activeAlarm.minute.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                  })}
                </div>
              </div>
              <div>Hello world!</div>
            </div>
            {alarmClock.maxSnoozeMinutes >=
              activeAlarm.snooze + alarmClock.snoozeInterval && (
              <Button variant="secondary" onClick={handleSnoozeAlarm}>
                Snooze (+{alarmClock.snoozeInterval} mins)
              </Button>
            )}
          </div>
          <div
            onClick={handleStopAlarm}
            className="w-fit animate-pulse rounded-full bg-primary p-2"
          >
            <X className="h-16 w-16" />
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
