import React from 'react'

import { Box, Icon, ListItem, Text } from '../atoms'
import { timeFormat } from '../helpers/helpers'
import { useApp } from '../layout/useApp'

export const ScheduleLesson = ({ onClick, lesson, isLast }) => {
  const { isSchool, isStaff, isStudent, userId } = useApp()
  const isSchoolOrStaff = isSchool || isStaff
  const myLesson = lesson.student_id === userId
  const claimed = !!lesson.student_id

  return (
    <ListItem onClick={onClick} isLast={isLast}>
      <Box mr={2} color={claimed ? 'text' : 'grey4'}>
        {timeFormat(lesson.startAt)}
      </Box>
      {((isSchoolOrStaff && claimed) || (isStudent && myLesson)) && (
        <>
          <Icon icon="user" /> {lesson.student()?.name()}
        </>
      )}
      {!isSchoolOrStaff && claimed && !myLesson && <Text color="grey4">Rezervovaný termín</Text>}
      {!claimed && <Text color="grey4">Volný termín</Text>}
    </ListItem>
  )
}
