import React, { forwardRef } from 'react'

import { Atom } from './Atom'

export const Image = forwardRef((props, ref) =>
  <Atom
    ref={ref}
    as='button'
    {...props}
    __css={{
      appearance: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      px: 3,
      py: 2,
      color: 'white',
      bg: 'primary',
      border: 0,
      borderRadius: 4,
    }}
  />
)
