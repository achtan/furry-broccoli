import React from 'react'
import styled from '@emotion/styled'
import {
  compose,
  space,
  layout,
  typography,
  color,
  flexbox,
  border,
} from 'styled-system'
import css  from '@styled-system/css'
import shouldForwardProp from '@styled-system/should-forward-prop'

const sx = props => css(props.sx)(props.theme)
const base = props => css(props.__css)(props.theme)

export const Atom = styled('div', {
  shouldForwardProp
})({
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  base,
  sx,
  props => props.css,
  compose(
    space,
    layout,
    typography,
    color,
    flexbox,
    border,
  ),
)
