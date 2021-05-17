import React, { forwardRef } from 'react'
import { Atom } from './Atom'

export const Heading = forwardRef((props, ref) =>
  <Atom
    ref={ref}
    display="block"
    fontSize={5}
    {...props}
  />
)

export const HeadingMain = forwardRef((props, ref) =>
  <Atom
    ref={ref}
    display="block"
    fontSize={5}
    mt={5}
    mb={2}
    {...props}
  />
)
