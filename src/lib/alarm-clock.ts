import { addDays, differenceInMinutes } from 'date-fns'
import { nanoid } from 'nanoid'

export type WeekDays = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
]

export interface Alarm {
  id: string
  title?: string
  hour: number
  minute: number
  snooze: number
  weekdays: WeekDays // SMTWTFS - 0111110 - Monday-Friday
}

export class AlarmClock {
  #alarms: Alarm[] = []
  #alarmInterval: any | null = null
  #alarmIndexMap: { [date: string]: string } = {} // date to Id lookup [Weekday, Hour, Minute] -> ID ::: { '1,11,30': '1234567890' }
  #intervalCallbacks: ((now: Date, alarm?: Alarm) => void)[] = []

  maxSnoozeMinutes = 2
  snoozeInterval = 1

  constructor() {
    this.loadAlarms()
  }

  onInterval(cb: (now: Date, alarm?: Alarm) => void): () => void {
    if (!this.#alarmInterval) {
      this.#alarmInterval = setInterval(() => {
        const now = this.getCurrentTime()
        const alarm = this.getAlarmAtTime(now)
        this.#intervalCallbacks.forEach((cb) => cb(now, alarm))
      }, 1000)
    }
    this.#intervalCallbacks.push(cb)
    return () => {
      this.#intervalCallbacks = this.#intervalCallbacks.filter(
        (cb) => cb !== cb
      )
      if (this.#intervalCallbacks.length === 0) {
        clearInterval(this.#alarmInterval)
        this.#alarmInterval = null
      }
    }
  }

  getAlarmAtTime(date: Date): Alarm | undefined {
    const key = `${date.getDay()},${date.getHours()},${date.getMinutes()}`
    return this.#alarmIndexMap[key]
      ? this.#alarms.find((a) => a.id === this.#alarmIndexMap[key])
      : undefined
  }

  getAlarmById(id: string): Alarm | undefined {
    return this.#alarms.find((a) => a.id === id)
  }

  getNextAlarm(): [Alarm, Date] | null {
    const now = this.getCurrentTime()
    for (let i = 0; i < 7; ++i) {
      const day = (now.getDay() + i) % 7
      const alarmsThisDay = this.#alarms.filter((a) => a.weekdays[day])
      const distances = alarmsThisDay.map((a) => {
        let alarmTime = new Date()
        alarmTime = addDays(alarmTime, i)
        alarmTime.setHours(a.hour)
        alarmTime.setMinutes(a.minute)
        return differenceInMinutes(alarmTime, now)
      })
      const minDistanceIndex = distances.indexOf(
        Math.min(...distances.filter((d) => d >= 0))
      )
      if (minDistanceIndex !== -1) {
        const nextAlarm = alarmsThisDay[minDistanceIndex]
        let alarmTime = new Date()
        alarmTime = addDays(alarmTime, i)
        alarmTime.setHours(nextAlarm.hour)
        alarmTime.setMinutes(nextAlarm.minute)
        return [alarmsThisDay[minDistanceIndex], alarmTime]
      }
    }
    return null
  }

  getAlarms(): Alarm[] {
    return this.#alarms
  }

  getCurrentTime(): Date {
    return new Date()
  }

  setAlarm(
    alarm: Omit<Alarm, 'id' | 'snooze'> & { id?: string; snooze?: number }
  ) {
    alarm.snooze = 0
    if (alarm.id) {
      // editing existing alarm
      const index = this.#alarms.findIndex((a) => a.id === alarm.id)
      if (index !== -1) {
        this.#alarms[index] = alarm as Alarm
      } else {
        console.log('Invalid Alarm Id - ', alarm.id, this.#alarms)
      }
    } else {
      // new alarm
      alarm.id = nanoid()
      this.#alarms.push(alarm as Alarm)
    }
    this.saveAlarms()
  }

  deleteAlarm(id: string) {
    const index = this.#alarms.findIndex((a) => a.id === id)
    if (index !== -1) {
      this.#alarms.splice(index, 1)
      this.saveAlarms()
    }
  }
  snoozeAlarm(id: string) {
    const index = this.#alarms.findIndex((a) => a.id === id)
    if (index !== -1) {
      const alarm = this.#alarms[index]
      alarm.snooze += this.snoozeInterval
      if (alarm.snooze > this.maxSnoozeMinutes) alarm.snooze = 0
      this.#alarms[index] = alarm
      this.saveAlarms()
    }
  }

  #generateIndexMap() {
    this.#alarmIndexMap = {}
    this.#alarms.forEach((alarm) => {
      const weekdays = alarm.weekdays
        .map((v, i) => (v ? i : -1))
        .filter((v) => v !== -1)

      // handling the snooze factor
      const alarmTime = new Date()
      alarmTime.setHours(alarm.hour)
      alarmTime.setMinutes(alarm.minute + alarm.snooze)

      const shouldIncrementWeekday = alarmTime.getHours() < alarm.hour

      weekdays.forEach((weekday) => {
        const key = `${weekday + (shouldIncrementWeekday ? 1 : 0)},${alarmTime.getHours()},${alarmTime.getMinutes()}`
        this.#alarmIndexMap[key] = alarm.id
      })
    })
    console.log(this.#alarmIndexMap)
  }

  stopAlarm(id: string) {
    const index = this.#alarms.findIndex((a) => a.id === id)
    if (index !== -1) {
      this.#alarms[index].snooze = -this.snoozeInterval
      setTimeout(() => {
        const index = this.#alarms.findIndex((a) => a.id === id)
        if (index !== -1) this.#alarms[index].snooze = 0
      }, 1000 * 65) // after minimum 1 minute
      this.saveAlarms()
    }
  }

  saveAlarms() {
    localStorage.setItem('alarms', JSON.stringify(this.#alarms))
    this.#generateIndexMap()
  }

  loadAlarms() {
    const alarms = localStorage.getItem('alarms')
    if (alarms) {
      try {
        const _alarms = JSON.parse(alarms)

        // reset snooze for alarms past 15 mins
        const now = this.getCurrentTime()
        _alarms.forEach((alarm: Alarm) => {
          const alarmTime = new Date()
          alarmTime.setHours(alarm.hour)
          alarmTime.setMinutes(alarm.minute + alarm.snooze)
          if (
            alarm.snooze &&
            differenceInMinutes(now, alarmTime) > this.maxSnoozeMinutes
          ) {
            alarm.snooze = 0
          }
        })

        this.#alarms = _alarms
      } catch (error) {
        console.log(error)
        this.#alarms = []
      }
    }
    this.saveAlarms()
    this.#generateIndexMap()
  }
}
