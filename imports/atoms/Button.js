import React, { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Atom } from './Atom'
import { border } from '../theme'

export const Button = forwardRef(({ outline, variant = 'primary', ...props }, ref) => (
  <Atom
    ref={ref}
    as={props.to ? RouterLink : 'button'}
    {...props}
    __css={{
      cursor: 'pointer',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      px: 3,
      py: 2,
      ...(outline
        ? {
            color: variant,
            bg: 'white',
          }
        : {
            color: 'white',
            bg: variant,
          }),
      ...border(variant, 4, 2),
    }}
  />
))
