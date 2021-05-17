import React, { forwardRef } from 'react'
import { Box } from './Box'

export const Card = forwardRef((props, ref) =>
  <Box
    ref={ref}
    sx={{
      boxShadow: '0 0 2rem 0 rgb(136 152 170 / 33%)',
      borderRadius: 6,
      backgroundColor: 'white',
    }}
    px={6}
    py={6}
    {...props}
  />
)
