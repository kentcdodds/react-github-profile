import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {getMockUser, getMockOrgs} from '../../shared/github-api.stub'
import Profile from './profile'

storiesOf('Profile', module)
  .add('example profile', () => (
    <Profile
      user={getMockUser()}
      orgs={getMockOrgs()}
    />
  ))
