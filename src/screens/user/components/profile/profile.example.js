import React from 'react'
import {storiesOf} from '@storybook/react'
import ThemeProvider from '../../../../shared/theme-provider'
import {getMockUser, getMockOrgs} from '../../shared/github-api.stub'
import Profile from './profile'

storiesOf('Profile', module).add('example profile', () =>
  <ThemeProvider>
    <Profile user={getMockUser()} orgs={getMockOrgs()} />
  </ThemeProvider>,
)
