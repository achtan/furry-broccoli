const grey5 = '#54585d'
const grey4 = '#9098a0'
const grey3 = '#ced4da'
const grey2 = '#e6e9ed'
const grey1 = '#F4F6FB'

export const border = (
  color: string,
  radius?: number | string,
  width: number | string = 1,
  position: 'Top' | 'Bottom' | 'Left' | 'Right' | '' = '',
  style: string = 'solid',
) => ({
  [`border${position}Color`]: color,
  [`border${position}Radius`]: radius,
  [`border${position}Width`]: width,
  [`border${position}Style`]: style,
})


export default {
  breakpoints: [ '30em', '52em', '64em' ],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#5e72e4',
    secondary: '#F38E19',
    muted: grey4,
    grey5,
    grey4,
    grey3,
    grey2,
    grey1,
    error: '#f5365c',
    danger: '#f5365c',
    highlight: 'hsla(205, 100%, 40%, 0.125)',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64, 96
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 12, 16, 24, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 4,
    circle: 99999,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
}
