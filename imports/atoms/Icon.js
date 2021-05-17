import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faCheck,
  faChevronRight,
  faClock,
  faPlusCircle,
  faSchool,
  faSignOutAlt,
  faSpinner,
  faTimes,
  faUnlock,
  faUser,
  faUsers,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faCopy } from '@fortawesome/free-regular-svg-icons'

import { Text } from './Text'

const icons = {
  bars: faBars,
  clock: faClock,
  spinner: faSpinner,
  plusCircle: faPlusCircle,
  times: faTimes,
  check: faCheck,
  user: faUser,
  users: faUsers,
  unlock: faUnlock,
  logout: faSignOutAlt,
  calendar: faCalendarAlt,
  arrowLeft: faArrowLeft,
  arrowRight: faArrowRight,
  chevronRight: faChevronRight,
  staff: faUserTie,
  school: faSchool,
  copy: faCopy,
}

export const Icon = ({ icon, spin, fixedWidth = true, ...props }) => (
  <Text {...props}>
    <FontAwesomeIcon icon={icons?.[icon]} spin={spin} fixedWidth={fixedWidth} />
  </Text>
)
