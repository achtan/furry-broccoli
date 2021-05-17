import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Users } from '../api/collections'
import { Container, HeadingMain, Modal, Spinner } from '../atoms'
import { ScheduleDay } from './ScheduleDay'
import { ScheduleLessonClaim } from './ScheduleLessonClaim'
import { useSchedule } from './useSchedule'
import { ScheduleNavigation } from './ScheduleNavigation'

export const StudentSchedule = () => {
  const { days, handleDateChange } = useSchedule()
  const [ editLesson, setEditLesson ] = useState(false)

  const query = useTracker(() => {
    return {
      loading: !Meteor.subscribe('schedule.main').ready(),
      staff: Users.find({ roles: 'staff' }).fetch(),
    }
  }, [])

  if (query.loading) {
    return <Spinner fontSize={5} mt={7} />
  }

  return (
    <Container>
      <HeadingMain>Rozvrh</HeadingMain>
      <ScheduleNavigation handleDateChange={handleDateChange} />

      {days.map((day) => (
        <ScheduleDay
          allowLessonCreation={false}
          key={day.format()}
          day={day}
          staffList={query.staff}
          lessonsList={query.lessons}
          onLessonClick={setEditLesson}
        />
      ))}

      <Modal isOpen={!!editLesson} onRequestClose={() => setEditLesson(false)}>
        {!!editLesson && (
          <ScheduleLessonClaim
            staffList={query.staff}
            onSuccess={() => setEditLesson(false)}
            {...editLesson}
          />
        )}
      </Modal>
    </Container>
  )
}
