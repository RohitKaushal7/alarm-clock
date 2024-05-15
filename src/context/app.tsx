import { createContext, useContext, useState } from 'react'

import { AlarmClock } from 'lib/alarm-clock'

interface AppContext {
  alarmClock: AlarmClock
}

const appContext = createContext<AppContext | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alarmClock] = useState(new AlarmClock())
  return (
    <appContext.Provider value={{ alarmClock }}>{children}</appContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(appContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return context
}
