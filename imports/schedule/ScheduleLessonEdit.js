import React from 'react'
import { Meteor } from 'meteor/meteor'
import dayjs from 'dayjs'
import * as Yup from 'yup'

import { Form, Formik, Input, Select } from '../atoms/Form'
import { Button, Row } from '../atoms'
import { confirmAction } from '../helpers/confirmAction'

const validationSchema = Yup.object().shape({
  staffId: Yup.object().required(),
  studentId: Yup.object().nullable(),
  dateFrom: Yup.string(),
  timeFrom: Yup.string()
    .matches(/\d\d:\d\d/)
    .required()
    .label('foo'),
})

export const ScheduleLessonEdit = ({
  onSuccess,
  onDelete,
  staffList,
  studentsList,
  staff,
  day,
  lesson,
}) => {
  const initialValues = {
    staffId: lesson?.staff_id || staff?._id,
    studentId: lesson?.student_id,
    dateFrom: dayjs(lesson?.startAt || day)?.format?.('YYYY-MM-DD'),
    timeFrom: lesson?.startAt ? dayjs(lesson?.startAt).format('HH:mm') : '',
    note: '',
  }

  const handleSubmit = ({ dateFrom, timeFrom, staffId, studentId, note }) => {
    const date = dayjs.tz(`${dateFrom}T${timeFrom}:00.000Z`)
    Meteor.call('schedule.saveLesson', {
      lessonId: lesson?._id,
      staffId: staffId?.value,
      studentId: studentId?.value,
      date: date.toDate(),
      note,
    })

    onSuccess()
  }

  const handleDelete = () => {
    confirmAction({
      title: 'Zrušiť termín?',
      onConfirm: () => {
        Meteor.call('schedule.deleteLesson', {
          lessonId: lesson?._id,
        })

        onDelete()
      },
    })
  }

  return (
    <div>
      <h2>Hodina</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input label="Dátum" name="dateFrom" type="date" />
          <Input label="Čas" name="timeFrom" type="time" />
          <Select
            label="Inštruktor"
            name="staffId"
            placeholder="Zvoľte"
            required
            options={staffList.map((user) => ({ value: user._id, label: user.name() }))}
          />
          <Select
            label="Študent"
            name="studentId"
            placeholder="Volný termín"
            isClearable
            options={studentsList.map((user) => ({ value: user._id, label: user.name() }))}
          />
          {/*<Input label="Poznámka" name="note" />*/}
          <Row justifyContent="space-between">
            <Button
              type="delete"
              mt={4}
              alignSelf="flex-end"
              onClick={handleDelete}
              variant="danger"
              outline
            >
              Zrusiť termín
            </Button>
            <Button type="submit" mt={4} alignSelf="flex-end">
              Uložiť
            </Button>
          </Row>
        </Form>
      </Formik>
    </div>
  )
}
