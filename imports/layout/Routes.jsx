import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { StaffList } from '../school-staff/StaffList'
import { StaffEdit } from '../school-staff/StaffEdit'
import { SchoolSchedule } from '../schedule/SchoolSchedule'
import { StudentSchedule } from '../schedule/StudentSchedule'
import { Login } from '../identity/Login'
import { Logout } from '../identity/Logout'
import { Box, Icon, Link, Row, Spinner, Text } from '../atoms'
import { Header } from './Header'
import { SideMenu, SideMenuItem } from './SideMenu'
import { useApp } from './useApp'
import { NavigationContainer, paths } from '../navigation'
import { border } from '../theme'
import { Footer } from './Footer'
import { Dashboard } from '../dashboard/Dashboard'
import { StaffSchedule } from '../schedule/StaffSchedule'

const ContentRoutes = () => (
  <Switch>
    <Redirect from={paths.login()} to={paths.home()} />
    {/* Student */}
    <Route path={paths.student.schedule()}>
      <StudentSchedule />
    </Route>

    {/* Staff */}
    <Route path={paths.staff.schedule()}>
      <StaffSchedule />
    </Route>

    {/* School */}
    <Route path={paths.school.editStaffMask}>
      <StaffEdit />
    </Route>
    <Route path={paths.school.addStaff()}>
      <StaffEdit />
    </Route>
    <Route path={paths.school.staffList()}>
      <StaffList />
    </Route>
    <Route path={paths.school.schedule()}>
      <SchoolSchedule />
    </Route>
    <Route path={paths.home()}>
      <Dashboard />
    </Route>
  </Switch>
)
const rolesOptions = {
  student: { icon: 'user', label: 'Študent', pathPrefix: 'student' },
  staff: { icon: 'staff', label: 'Inštruktor', pathPrefix: 'instruktor' },
  school: { icon: 'school', label: 'Škola', pathPrefix: 'skola' },
}

const RoleSwitcher = ({ roles }) => {
  let { params } = useRouteMatch()
  const currentRole = roles?.find((role) => rolesOptions[role].pathPrefix === params?.role)
  console.log('roles', roles, currentRole)
  if (!currentRole) {
    return <Redirect to={paths[roles[0]].schedule()} />
  }

  if (!roles?.length || roles?.length < 1) {
    return null
  }

  return (
    roles?.length > 1 && (
      <Box p={3}>
        <Text color="muted" fontSize={1} fontWeight="bold">VAŠA ROLA JE:</Text>
        <Row>
          {roles?.map((role) => (
            <Link key={role} to={paths[role].schedule()} color="text" mr={1}>
              <Row
                {...border(currentRole === role ? 'primary' : 'grey3', 3, 2)}
                color={currentRole === role ? 'primary' : 'grey3'}
                p={1}
                alignItems="center"
                fontSize={1}
              >
                <Icon icon={rolesOptions[role].icon} mr={1} fixedWidth={false} />
                <Text>{rolesOptions[role].label}</Text>
              </Row>
            </Link>
          ))}
        </Row>
      </Box>
    )
  )
}

export const Routes = () => {
  const { isLogged, isSchool, isStudent, user, loading } = useApp()
  const roles = user?.roles?.filter((r) => r !== 'admin') || ['student']

  return (
    <Router>
      <NavigationContainer.Provider>
        <Box>
          <Route path={paths.logout()}>
            <Logout />
          </Route>

          {!isLogged ? (
            <Route>
              <Login />
            </Route>
          ) : loading ? (
            <Row height="100vh">
              <Spinner fontSize={6} />
            </Row>
          ) : (
            <Row height="100vh">
              <Box height="100vh" flexGrow={1} flexShring={1}>
                <Box flexShrink={0}>
                  <Header />
                </Box>
                <ContentRoutes />
                <Footer />
              </Box>
              <SideMenu>
                <Route path="/:role?">
                  <RoleSwitcher roles={roles} />
                </Route>

                <Text color="grey4" fontSize={1} fontWeight="bold" pt={3} pl={3}>MENU</Text>
                {/* Student */}
                <Route path={`/${rolesOptions.student.pathPrefix}`}>
                  <SideMenuItem icon="calendar" to={paths.student.schedule()}>
                    Rozvrh
                  </SideMenuItem>
                </Route>

                {/* Staff */}
                <Route path={`/${rolesOptions.staff.pathPrefix}`}>
                  <SideMenuItem icon="calendar" to={paths.staff.schedule()}>
                    Rozvrh
                  </SideMenuItem>
                </Route>

                {/* School */}
                <Route path={`/${rolesOptions.school.pathPrefix}`}>
                  <SideMenuItem icon="calendar" to={paths.school.schedule()}>
                    Rozvrh
                  </SideMenuItem>
                  <SideMenuItem icon="staff" to={paths.school.staffList()}>
                    Inštruktori
                  </SideMenuItem>
                </Route>
                <SideMenuItem icon="logout" to={paths.logout()}>
                  Odhlasiť
                </SideMenuItem>
              </SideMenu>
            </Row>
          )}
        </Box>
      </NavigationContainer.Provider>
    </Router>
  )
}
