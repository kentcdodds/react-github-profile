import React from 'react'
import {storiesOf} from '@kadira/storybook'
import App from '.'

storiesOf('App', module)
  .add('default', () => (
    <App />
  ))
