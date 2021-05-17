import React, { forwardRef } from 'react'

import { Icon } from './Icon'

export const Spinner = forwardRef((props, ref) =>
  <Icon
    ref={ref}
    icon="spinner"
    spin
    color="primary"
    width="100%"
    fontSize={4}
    textAlign="center"
    {...props}
  />
)
