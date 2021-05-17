import React from 'react'
import { border } from '../theme'
import { Row } from './Row'
import { Icon } from './Icon'
import { Text } from './Text'
import { Clickable } from './Clickable'

export const ListItem = ({children, onClick, to, isLast = false}) => {
  return (
    <Clickable
      onClick={onClick}
      to={to}
      flexDirection="row"
      justifyContent="space-between"
      {...(isLast ? {} : border('grey2', 0, 1, 'Bottom'))}
      py={3}
    >
      <Row flexGrow={1}>
        {children}
      </Row>
      <Text color="grey4">
        <Icon icon="chevronRight" />
      </Text>
    </Clickable>
  )
}
