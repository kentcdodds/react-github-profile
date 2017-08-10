import React from 'react'
import {storiesOf} from '@storybook/react'
import ThemeProvider from '../../shared/theme-provider'
import App from '.'

storiesOf('App', module).add('default', () =>
  <ThemeProvider>
    <App match={{params: {username: 'kentcdodds'}}} />
  </ThemeProvider>,
)
