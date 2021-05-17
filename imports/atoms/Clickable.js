import React, { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Atom } from './Atom'

export const Clickable = forwardRef(({ outline, ...props }, ref) => (
  <Atom
    ref={ref}
    as={props.to ? RouterLink : 'div'}
    {...props}
    __css={{
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      color: 'text',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'none',
      }
    }}
  />
))
