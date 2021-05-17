import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export const useSchedule = () => {
  const [ startDay, setStartDay ] = useState(dayjs().startOf('isoWeek'))
  const [ days, setDays ] = useState([])

  useEffect(() => {
    const newDays = [ 0, 1, 2, 3, 4, 5, 6 ].map((add) => startDay.add(add, 'day'))
    setDays(newDays)
  }, [ startDay ])

  const handleDateChange = (value) => {
    if (value === '+1w') {
      setStartDay(startDay.add(1, 'week'))
    }
    if (value === '-1w') {
      setStartDay(startDay.subtract(1, 'week'))
    }
    if (value === 'thisWeek') {
      setStartDay(dayjs().startOf('isoWeek'))
    }
  }

  return {
    days,
    handleDateChange,
  }
}
