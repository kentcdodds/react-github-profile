import PropTypes from 'prop-types'
import React from 'react'
import {getRepoUrl} from '../../shared/github-urls'
import Fetch from '../fetch'
import RepoList from './repo-list'

export default RepoListFetcher

function RepoListFetcher(props) {
  const {username} = props
  return (
    <Fetch url={getRepoUrl(username)}>
      {({data: repos, loading, error}) =>
        <div>
          {loading && <div>Loading repository list...</div>}
          {error &&
            <div>
              Error loading repositories for <code>{username}</code>{' '}
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>}
          {repos && <RepoList {...props} repos={repos} />}
        </div>}
    </Fetch>
  )
}

RepoListFetcher.propTypes = {
  username: PropTypes.string.isRequired,
}
