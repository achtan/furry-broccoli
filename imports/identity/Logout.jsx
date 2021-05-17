import React, { useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import { useHistory } from 'react-router-dom'
import { paths } from '../navigation'

export const Logout = () => {
  const history = useHistory()
  useEffect(() => {
    Meteor.logout(() => {
      history.push(paths.home())
    })
  }, [])

  return null
}
