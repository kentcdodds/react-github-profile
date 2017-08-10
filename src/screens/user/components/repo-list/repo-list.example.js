import React from 'react'
import {storiesOf} from '@storybook/react'
import ThemeProvider from '../../../../shared/theme-provider'
import {getMockRepos} from '../../shared/github-api.stub'
import RepoList from './repo-list'

storiesOf('RepoList', module)
  .add('list of repos', () =>
    <ThemeProvider>
      <RepoList repos={getMockRepos()} filter={''} />
    </ThemeProvider>,
  )
  .add('list of repos filtered by `javascript`', () =>
    <ThemeProvider>
      <RepoList repos={getMockRepos()} filter={'javascript'} />
    </ThemeProvider>,
  )
