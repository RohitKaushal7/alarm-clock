import { FunctionComponent, useEffect, useState } from 'react'

import AlarmRow from 'components/AlarmRow'
import Clock from 'components/Clock'
import { Button } from 'components/ui'

import { useAppContext } from 'context/app'
import { formatRelative } from 'date-fns'
import { Alarm } from 'lib/alarm-clock'
import { sendMassage } from 'lib/analytics'
import { AlarmCheck, HelpCircle, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'

interface IndexRouteProps {}

const IndexRoute: FunctionComponent<IndexRouteProps> = () => {
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null)
  const [nextAlarm, setNextAlarm] = useState<[Alarm, Date] | null>(null)
  const { alarmClock } = useAppContext()
  const [alarms] = useState<Alarm[]>(alarmClock.getAlarms())

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

  useEffect(() => {
    sendMassage('Alarm Clock', 'Someone checked out!')
  }, [])

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

  alarms.sort((a, b) => {
    if (a.hour === b.hour) {
      return a.minute - b.minute
    }
    return a.hour - b.hour
  })

  return (
    <div className="relative mx-auto flex max-w-2xl flex-col p-4">
      <h1 className="z-90 sticky top-0 mt-16 bg-black py-4 text-3xl font-bold">
        Alarm
      </h1>
      <h1 className="text-xs text-neutral-400">
        {nextAlarm ? (
          <span>Next ring {formatRelative(nextAlarm[1], new Date())}</span>
        ) : (
          <span>No upcoming alarms for now!</span>
        )}
      </h1>
      <Clock />
      <div className="py-3">
        <Link to="/alarm/new">
          <Button>
            <Plus className="-ml-2 mr-1 h-5" /> New Alarm
          </Button>
        </Link>
      </div>

      {activeAlarm && (
        <div className="z-100 fixed inset-0 flex flex-col justify-end bg-black/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-end gap-16 overflow-hidden p-8 py-32">
            <div className="flex flex-col items-center gap-16">
              <div className="fap-8 flex flex-col items-center gap-4">
                <AlarmCheck className="mb-8 h-16 w-16 animate-bounce" />
                <div className="flex flex-col items-center gap-6">
                  <div className="text-5xl font-bold">
                    {new Date().getHours()} :{' '}
                    {new Date().getMinutes().toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                    })}
                  </div>
                  <div className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold">
                    {activeAlarm.hour} :{' '}
                    {activeAlarm.minute.toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                    })}
                  </div>
                </div>
                <div className="text-center">{activeAlarm.title}</div>
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
        </div>
      )}
      <div className="flex flex-col gap-4 py-4">
        {alarms.map((alarm) => (
          <Link to={`alarm/${alarm.id}`}>
            <AlarmRow alarm={alarm} key={alarm.id} />
          </Link>
        ))}
        {alarms.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 p-4 py-8 text-3xl text-neutral-700">
            <div className="text-center">No Alarms Set!</div>
          </div>
        )}
      </div>
      <Link
        className="fixed right-2 top-2 p-2 opacity-50 transition hover:opacity-80"
        to="/about"
      >
        <HelpCircle className="h-5 w-5" />
      </Link>
    </div>
  )
}

export default IndexRoute
