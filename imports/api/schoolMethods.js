import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Accounts } from 'meteor/accounts-base'
import { Schools, Users } from './collections'
import { acl } from '../helpers/acl'


Meteor.methods({
  'school.saveStaff'({ _id, firstName, lastName, email, password, newPassword }) {
    check(firstName, String)
    check(lastName, String)

    acl.allowSchool(this.userId)

    const school = Schools.findOne({ owner_id: this.userId })
    if (!school) {
      throw new Meteor.Error('no-school', 'Nenašla sa autoškola.')
    }

    const isNew = !_id
    let staffId = _id
    if (isNew) {
      staffId = Accounts.createUser({
        username: email,
        email,
        profile: { firstName, lastName },
      })

      Accounts.setPassword(staffId, password)
    }

    Users.update(staffId, {
      $set: {
        _school_id: school._id,
        roles: [ 'staff' ],
        'profile.firstName': firstName,
        'profile.lastName': lastName,
      },
    })

    if (!isNew && newPassword) {
      Accounts.setPassword(staffId, newPassword)
    }

    if (isNew) {
      Accounts.sendEnrollmentEmail(staffId)
    }
  },
})
