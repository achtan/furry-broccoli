import React from 'react'
import { Button, Icon, Row } from '../atoms'

export const ScheduleNavigation = ({ handleDateChange }) => {
  return (
    <Row mt={1} justifyContent="space-between">
      <Row>
        <Button outline py={1} onClick={() => handleDateChange('thisWeek')} mr={3}>
          Tento týždeň
        </Button>
        <Button outline py={1} onClick={() => handleDateChange('-1w')} mr={1}>
          <Icon icon="arrowLeft" />
        </Button>
        <Button outline py={1} onClick={() => handleDateChange('+1w')}>
          <Icon icon="arrowRight" />
        </Button>
      </Row>
    </Row>
  )
}
