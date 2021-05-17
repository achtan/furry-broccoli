import { Meteor } from 'meteor/meteor'
import { Lessons, Users } from './collections'
import { acl } from '../helpers/acl'
import { dayRange, ensureSchool } from '../helpers/helpers'
import dayjs from 'dayjs'

Meteor.publish('school.staff', function () {
  const school = ensureSchool(this.userId)

  return Users.find({ _school_id: school._id, roles: 'staff' })
})

Meteor.publish('schedule.main', function () {
  const school = ensureSchool(this.userId)

  return Users.find({
    _school_id: school._id,
    roles: { $in: ['staff', 'student'] },
    anonymized: null,
  })
})

Meteor.publish('schedule.lessons', function ({ day }) {
  const isStaff = acl.isStaff(this.userId)

  const school = ensureSchool(this.userId)
  const users = Users.find({ _school_id: school._id, roles: 'staff' })
  const staffIds = users.map((staff) => staff._id)
  return Lessons.find({
    staff_id: { $in: staffIds },
    startAt: dayRange(dayjs.tz(day)),
    ...(isStaff
      ? {}
      : {
          $or: [{ student_id: null }, { student_id: this.userId }],
        }),
  })
})
