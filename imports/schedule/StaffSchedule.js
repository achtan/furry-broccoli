import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Users } from '../api/collections'
import { Container, HeadingMain, Modal, Spinner } from '../atoms'
import { ScheduleDay } from './ScheduleDay'
import { useSchedule } from './useSchedule'
import { ScheduleNavigation } from './ScheduleNavigation'
import { ScheduleLessonEdit } from './ScheduleLessonEdit'

export const StaffSchedule = () => {
  const { days, handleDateChange } = useSchedule()
  const [ editLesson, setEditLesson ] = useState(false)

  const query = useTracker(() => {
    return {
      loading: !Meteor.subscribe('schedule.main').ready(),
      staff: Users.find({ _id: Meteor.userId() }).fetch(),
      students: Users.find({ roles: 'student' }).fetch(),
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
          <ScheduleLessonEdit
            staffList={query.staff}
            studentsList={query.students}
            onSuccess={() => setEditLesson(false)}
            onDelete={() => setEditLesson(false)}
            {...editLesson}
          />
        )}
      </Modal>
    </Container>
  )
}
