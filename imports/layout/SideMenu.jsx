import React from 'react'
import { useDeviceDetect } from '../helpers/useDeviceDetect'
import { Box, Icon, Link, Row, Text } from '../atoms'
import { useApp } from './useApp'
import { border } from '../theme'

export const SideMenuItem = ({ to, icon, children }) => (
  <Link to={to} color="text">
    <Row fontSize="18px" p={2} alignItems="center">
      <Icon icon={icon} color="grey5" mr={2} />
      <Text color="text">{children}</Text>
    </Row>
  </Link>
)

export const SideMenu = ({ children }) => {
  const { sideMenuOpen, setSideMenuOpen, user } = useApp()

  const device = useDeviceDetect()
  const isMobile = device.isMobile()
  return (
    <Box
      onClick={() => setSideMenuOpen(false)}
      style={{
        opacity: sideMenuOpen ? 1 : 0,
        transform: sideMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      }}
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        backgroundColor: '#0000005c',
        transition: `opacity 300ms ease-in-out 0ms,transform 0ms ${sideMenuOpen ? '0ms' : '300ms'}`,
      }}
    >
      <Box
        style={{
          visibility: sideMenuOpen ? 'visible' : 'hidden',
          transform: sideMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        sx={{
          position: 'fixed',
          zIndex: 19,
          width: isMobile ? '85%' : 320,
          height: '100%',
          right: 0,
          top: 0,
          backgroundColor: 'white',
          boxShadow: '0 0 2rem 0 rgb(136 152 170 / 33%)',
          transition: `transform 200ms ease-out 0ms,visibility 0ms ${
            sideMenuOpen ? '0ms' : '300ms'
          }`,
        }}
      >
        <Box sx={{ backgroundColor: '' }}>
          <Row
            fontSize={3}
            height={60}
            px={3}
            justifyContent="flex-end"
            {...border('grey3', 0, 1, 'Bottom')}
          >
            <Icon icon="user" />
            <Text>{user?.name()}</Text>
          </Row>
        </Box>
        {children}
      </Box>
    </Box>
  )
}
