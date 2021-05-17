import React from 'react'
import { Box } from './Box'

export const Container = (props) => (
  <Box px={[2, 6]} maxWidth={['100%', '40em', '50em']} width="100%" mx="auto" {...props} />
)
