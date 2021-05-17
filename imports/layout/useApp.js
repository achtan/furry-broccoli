import { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { createContainer } from '../helpers/unstated'
import { acl } from '../helpers/acl'
import { Users } from '../api/collections'

export const AppContainer = createContainer('App', () => {
  const [ sideMenuOpen, setSideMenuOpen ] = useState(false)
  const userId = useTracker(() => Meteor.userId(), [])
  const user = useTracker(() => Meteor.user(), [])

  return {
    userId,
    isLogged: !!userId,
    user,
    isAdmin: acl.isAdmin(userId),
    isSchool: acl.isSchool(userId),
    isStaff: acl.isStaff(userId),
    isStudent: acl.isStudent(userId),
    canEditSchedule: Users.can.editSchedule(userId),
    sideMenuOpen,
    setSideMenuOpen,
    loading: !!userId && user?.roles?.length === undefined,
  }
})

export const useApp = () => AppContainer.useContainer()

