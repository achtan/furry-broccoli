import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import dayjs from 'dayjs'

import { Lessons } from '../api/collections'
import { Box, Card, Clickable, Icon, Row, Spinner, Text } from '../atoms'
import { dayLongFormat, dayRange } from '../helpers/helpers'
import { ScheduleLesson } from './ScheduleLesson'
import { border } from '../theme'

export const ScheduleDay = ({ allowLessonCreation, day, staffList, onLessonClick }) => {
  const query = useTracker(() => {
    return {
      loading: !Meteor.subscribe('schedule.lessons', { day: day.toDate() }).ready(),
      lessons: Lessons.find({ startAt: dayRange(dayjs.tz(day)) }, { sort: { startAt: 1 } }).fetch(),
    }
  }, [])

  if (query.loading) {
    return <Spinner fontSize={5} mt={7} />
  }

  const list = staffList.reduce((result, staff) => {
    const lessons = query.lessons.filter((l) => l.staff_id === staff._id)
    if (lessons.length) {
      result.push({ staff, lessons })
    }
    return result
  }, [])

  return (
    <Card px={0} py={3} mt={4}>
      <Box {...border('grey2', 0, 1, 'Bottom')} px={4} pb={3}>
        <Row justifyContent="space-between">
          <Text fontSize={3}>{dayLongFormat(day)}</Text>
          {allowLessonCreation && (
            <Clickable onClick={() => onLessonClick({ day })}>
              <Text color="primary">
                <Icon icon="plusCircle" /> Pridať termín
              </Text>
            </Clickable>
          )}
        </Row>
      </Box>

      {!list.length && (
        <Text color="muted" pl={3} pt={3}>
          Žiadne lekcie
        </Text>
      )}
      {list.map(({ staff, lessons }) => (
        <Box key={staff._id} mt={2} px={4}>
          <Row color="secondary" mt={2} fontWeight="bold">
            <Icon icon="staff" mr={2} /> {staff.name()}
          </Row>
          {!!lessons.length &&
            lessons.map((lesson, key) => (
              <ScheduleLesson
                key={lesson._id}
                lesson={lesson}
                onClick={() => onLessonClick({ lesson })}
                isLast={lessons.length === key + 1}
              />
            ))}
        </Box>
      ))}
    </Card>
  )
}
