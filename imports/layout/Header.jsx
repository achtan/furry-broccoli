import React from 'react'
import { Clickable, Icon, Logo, Row, Text } from '../atoms'
import { useApp } from './useApp'

export const Header = () => {
  const { setSideMenuOpen, user } = useApp()
  return (
    <Row height="60px" bg="primary" alignItems="center" justifyContent="space-between" p={1}>
      <Logo white height={25} ml={2} />
      <Clickable p={2} onClick={() => setSideMenuOpen(true)}>
        <Row>
          <Text color="white" mr={2}>
            {user?.name()}
          </Text>
          <Icon color="white" icon="bars" />
        </Row>
      </Clickable>
    </Row>
  )
}
