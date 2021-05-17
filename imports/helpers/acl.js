import { Users } from '../api/collections'

const isInRole = (user, roles) => {
  const thisUser = typeof user === 'string' || user instanceof String ? Users.findOne(user) : user
  if (thisUser && roles.find(role => Users.is[role](thisUser))) {
    return thisUser
  }
  return false
}

const allowRole = (user, roles) => {
  const thisUser = isInRole(user, roles)
  if (!thisUser) {
    throw new Meteor.Error('503 - no permission');
  }

  return thisUser
}

const isAdmin = (user) => isInRole(user, ['admin'])
const isSchool = (user) => isInRole(user, ['school', 'admin'])
const isStaff = (user) => isInRole(user, ['staff', 'school', 'admin'])
const isStudent = (user) => isInRole(user, ['student', 'admin'])

const allowAdmin = (user) => allowRole(user, ['admin'])
const allowSchool = (user) => allowRole(user, ['school', 'admin'])
const allowStaff = (user) => allowRole(user, ['staff', 'school', 'admin'])
const allowStudent = (user) => allowRole(user, ['student', 'admin'])


export const acl = {
  isAdmin,
  isSchool,
  isStaff,
  isStudent,
  allowAdmin,
  allowSchool,
  allowStaff,
  allowStudent,
}
