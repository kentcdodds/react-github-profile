import React, {PropTypes} from 'react'
import {getUserUrl, getOrgUrl} from '../shared/github-urls'
import Fetch from './fetch'
import Profile from './profile'

export default ProfileFetcher

function ProfileFetcher({username}) {
  return (
    <Fetch url={[getUserUrl(username), getOrgUrl(username)]}>
      {({data, loading, error}) => (
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>Error loading info for <code>{username}</code> <pre>{JSON.stringify(error, null, 2)}</pre></div>}
          {data && <Profile user={data[0]} orgs={data[1]} />}
        </div>
      )}
    </Fetch>
  )
}

ProfileFetcher.propTypes = {
  username: PropTypes.string.isRequired,
}
