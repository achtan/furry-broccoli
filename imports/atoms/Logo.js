import React, { forwardRef } from 'react'
import { Box } from './Box'

export const Logo = forwardRef(({ height = 40, white = false, ...props }, ref) => (
  <Box
    ref={ref}
    as="img"
    src={white ? '/logo-white.png' : '/logo.png'}
    height={height}
    {...props}
  />
))
