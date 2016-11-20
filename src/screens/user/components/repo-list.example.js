/* eslint func-style:0 */
import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {getMockRepos} from '../shared/github-api.stub'
import GlamorStyles from '../shared/glamor-styles'
import RepoList from './repo-list'

storiesOf('RepoList', module)
  .add('list of repos', () => (
    <div>
      <RepoList
        repos={getMockRepos()}
        filter={''}
      />
      <GlamorStyles />
    </div>
  ))
  .add('list of repos filtered by `javascript`', () => (
    <RepoList
      repos={getMockRepos()}
      filter={'javascript'}
    />
  ))
