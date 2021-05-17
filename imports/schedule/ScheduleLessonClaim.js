import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Form, Formik, Input, Select } from '../atoms/Form'
import { Box, Button, Icon, Text } from '../atoms'
import dayjs from 'dayjs'
import { dayLongFormat } from '../helpers/helpers'

export const ScheduleLessonClaim = ({ onSuccess, lesson }) => {
  const claimed = !!lesson.student_id

  const handleSubmit = ({  }) => {
    Meteor.call('schedule.claimLesson', {
      lessonId: lesson._id,
    })

    onSuccess()
  }

  return (
    <div>
      <Text fontSize={claimed ? 2 : 4}>Rezervácia hodiny</Text>
      {claimed ? (
        <Box>
          <Text color="primary" fontSize={4}>Hodina je už rezervovaná</Text>
        </Box>
      ) : (
        <Box>
          <Box mt={2}>
            Termín: <Text fontWeight="bold">{dayLongFormat(lesson.startAt)}</Text>
          </Box>
          <Box mt={1}>
            Inštruktor: <Text fontWeight="bold">{lesson.staff().name()}</Text>
          </Box>
          <Box alignItems="flex-end" mt={3}>
            <Button onClick={handleSubmit}><Icon icon="check"/> Rezervovať</Button>
          </Box>
        </Box>
      )}
    </div>
  )
}
