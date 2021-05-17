import React  from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Text } from './Text'

export const Link = ({ to, ...props }) => <RouterLink to={to}>
  <Text {...props} />
</RouterLink>
