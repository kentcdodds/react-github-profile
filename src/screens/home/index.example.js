import React from 'react'
import {storiesOf} from '@storybook/react'
import ThemeProvider from '../../shared/theme-provider'
import Home from '.'

storiesOf('Home', module).add('default', () =>
  <ThemeProvider>
    <Home />
  </ThemeProvider>,
)
