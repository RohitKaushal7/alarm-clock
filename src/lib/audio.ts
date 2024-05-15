import alarm1 from 'assets/audio/alarm1.wav'

const AlarmRing = new Audio(alarm1)
AlarmRing.loop = true
AlarmRing.volume = 1
AlarmRing.preload = 'auto'

export { AlarmRing }
