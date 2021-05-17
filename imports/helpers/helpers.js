import { Meteor } from 'meteor/meteor'
import dayjs from 'dayjs'
import { Schools, Users } from '../api/collections'
import { acl } from './acl'

export const dayRange = (day) => ({
  $gte: day.startOf('day').toDate(),
  $lte: day.endOf('day').toDate(),
})

export const firstUpper = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const dayLongFormat = (day) => firstUpper(dayjs(day).format('dd DD. MMMM'))
export const timeFormat = (day) => dayjs(day).format('HH:mm')

export const ensureSchool = (userId) => {
  const user = Users.findOne(userId)
  const school = acl.isSchool(userId)
    ? Schools.findOne({ owner_id: userId })
    : Schools.findOne(user._school_id)

  if (!school) {
    throw new Meteor.Error('no-school', 'Nenašla sa autoškola.')
  }

  return school
}
