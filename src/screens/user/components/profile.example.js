import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {getMockUser, getMockOrgs} from '../shared/github-api.stub'
import Profile from './profile'

storiesOf('Profile', module)
  .add('example profile', () => (
    <Profile
      getUserData={getUserData}
      username={'kentcdodds'}
    />
  ))

function getUserData() {
  const user = getMockUser()
  const orgs = getMockOrgs()
  return Promise.resolve({user, orgs})
}
