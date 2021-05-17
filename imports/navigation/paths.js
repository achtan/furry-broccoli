import { generatePath } from 'react-router-dom'

const masks = {}


export const paths = {
  home: () => '/',
  login: () => '/prihlasenie',
  logout: () => '/odhlasit',
  student: {
    schedule: () => '/student/rozvrh',
  },
  staff: {
    schedule: () => '/instruktor/rozvrh',
  },
  school: {
    schedule: () => '/skola/rozvrh',
    staffList: () => '/skola/ucitalia',
    addStaff: () => '/skola/ucitalia/pridat',
    editStaffMask: '/skola/ucitalia/upravit/:id',
    editStaff: (id) => generatePath(paths.school.editStaffMask, { id }),
  },
  fe: {
    home: () => 'https://www.dobryvodic.sk/'
  }
}
