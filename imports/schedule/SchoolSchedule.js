import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Users } from '../api/collections'
import { Button, Container, HeadingMain, Icon, Modal, Row, Spinner } from '../atoms'
import { ScheduleDay } from './ScheduleDay'
import { useSchedule } from './useSchedule'
import { ScheduleNavigation } from './ScheduleNavigation'
import { ScheduleLessonEdit } from './ScheduleLessonEdit'
import { dayLongFormat } from '../helpers/helpers'
import { confirmAction } from '../helpers/confirmAction'

export const SchoolSchedule = () => {
  const { days, handleDateChange } = useSchedule()
  const [editLesson, setEditLesson] = useState(false)

  const query = useTracker(() => {
    return {
      loading: !Meteor.subscribe('schedule.main').ready(),
      staff: Users.find({ roles: 'staff' }).fetch(),
      students: Users.find({ roles: 'student' }).fetch(),
    }
  }, [])

  if (query.loading) {
    return <Spinner fontSize={5} mt={7} />
  }

  const handleCopyWeek = () => {
    confirmAction({
      title: 'Skopírovať termíny?',
      text: `Skopíruju sa všetky termíny od ${dayLongFormat(days[0])} do ${dayLongFormat(
        days[days.length - 1],
      )} vrátane.`,
      onConfirm: () => {
        Meteor.call('schedule.copyDays', {
          days: days.map((d) => d.toDate()),
        }, (error, result) => {
          if(error) {
            console.log(error)
            return
          }
          confirmAction({
            title: 'Lekcie skopírované',
            icon: 'success',
            confirmButtonText: 'OK',
            showCancelButton: false,
          })
        })
      },
    })
  }

  return (
    <Container>
      <HeadingMain>Rozvrh</HeadingMain>
      <ScheduleNavigation handleDateChange={handleDateChange} />

      {days.map((day) => (
        <ScheduleDay
          key={day.format()}
          allowLessonCreation={true}
          day={day}
          staffList={query.staff}
          lessonsList={query.lessons}
          onLessonClick={setEditLesson}
        />
      ))}

      <Row mt={3}>
        <Button outline py={1} onClick={handleCopyWeek}>
          <Icon icon="copy" /> Skopírovať na další tyzdeň
        </Button>
      </Row>

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
