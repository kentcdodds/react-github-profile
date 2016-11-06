/* eslint func-style:0 */
import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {getMockRepos} from '../shared/github-api.stub'
import RepoList from './repo-list'

const getRepos = async () => getMockRepos()

storiesOf('RepoList', module)
  .add('list of repos', () => (
    <RepoList
      getRepos={getRepos}
      filter={''}
      username={'kentcdodds'}
    />
  ))
  .add('list of repos filtered by `javascript`', () => (
    <RepoList
      getRepos={getRepos}
      filter={'javascript'}
      username={'kentcdodds'}
    />
  ))
