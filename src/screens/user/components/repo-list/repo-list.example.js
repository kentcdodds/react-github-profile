/* eslint func-style:0 */
import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {getMockRepos} from '../../shared/github-api.stub'
import RepoList from './repo-list'

storiesOf('RepoList', module)
  .add('list of repos', () => (
    <RepoList
      repos={getMockRepos()}
      filter={''}
    />
  ))
  .add('list of repos filtered by `javascript`', () => (
    <RepoList
      repos={getMockRepos()}
      filter={'javascript'}
    />
  ))
