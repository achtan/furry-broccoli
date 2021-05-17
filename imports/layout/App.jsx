import React from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from '../theme'
import { Routes } from './Routes'
import { AppContainer } from './useApp'

export const App = () => (
  <AppContainer.Provider>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </AppContainer.Provider>
)
