import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Lessons, Users } from './collections'
import { acl } from '../helpers/acl'
import dayjs from 'dayjs'
import { ensureSchool } from '../helpers/helpers'

Meteor.methods({
  'schedule.saveLesson'({ lessonId, staffId, date, note, studentId = null }) {
    check(staffId, String)
    check(note, String)
    check(date, Date)

    acl.allowStaff(this.userId)

    const data = {
      staff_id: staffId,
      startAt: dayjs.tz(date).toDate(),
      note,
      student_id: studentId,
    }

    console.log('data', data)

    if (!lessonId) {
      const school = ensureSchool(this.userId)
      Lessons.insert({ ...data, school_id: school._id })
      return null
    }

    Lessons.update(lessonId, { $set: data })
  },
  'schedule.deleteLesson'({ lessonId }) {
    check(lessonId, String)
    acl.allowStaff(this.userId)

    const school = ensureSchool(this.userId)
    console.log({ _id: lessonId, school_id: school._id })
    Lessons.remove({ _id: lessonId, school_id: school._id })
  },
  'schedule.claimLesson'({ lessonId }) {
    check(lessonId, String)

    acl.allowStudent(this.userId)

    const lesson = Lessons.findOne(lessonId)
    if (!lesson) {
      throw Meteor.Error('not-found', 'Hodina sa nenašla.')
    }

    if (lesson.student_id) {
      throw Meteor.Error('already-claimed', 'Hodina je už obsadená.')
    }

    Lessons.update(lessonId, { $set: { student_id: this.userId } })
  },
  'schedule.copyDays'({ days }) {
    acl.allowSchool(this.userId)

    const school = ensureSchool(this.userId)

    const staffIds = Users.find({ _school_id: school._id, roles: 'staff' })
      .fetch()
      .map((u) => u._id)

    const startAt = { $gte: days[ 0 ], $lte: days[ days.length - 1 ] }
    Lessons.find({ startAt, staff_id: { $in: staffIds } }).forEach((l) => {
      Lessons.insert({
        school_id: l.school_id,
        staff_id: l.staff_id,
        startAt: dayjs.tz(l.startAt).add(1, 'week').toDate(),
      })
    })
  },
})
