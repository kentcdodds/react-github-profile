/* @jsx jsx */
import {jsx} from '@emotion/core'

import PropTypes from 'prop-types'
import {Section, Text, Image} from '../../../shared/pattern'
import UserContext from '../user-context'

function Profile({user}) {
  return (
    <div>
      <Section>
        <Image responsive rounded alt="User Avatar" src={user.avatarUrl} />
        <Text size="heading">{user.name}</Text>
        <Text
          size="standard"
          tint="faded"
          css={{fontWeight: 300, fontSize: 20}}
        >
          {user.login}
        </Text>
      </Section>
      <ProfileStatsSection user={user} />
      {user.organizations.length ? (
        <OrganizationsSection orgs={user.organizations} />
      ) : null}
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    organizations: PropTypes.array.isRequired,
  }).isRequired,
}

function ProfileStatsSection({user}) {
  return (
    <Section css={{textAlign: 'center'}}>
      <ProfileStat value={user.followersCount} label="followers" />
      <ProfileStat value={user.repositoriesCount} label="repositories" />
      <ProfileStat value={user.followingCount} label="following" />
    </Section>
  )
}

ProfileStatsSection.propTypes = {
  user: PropTypes.shape({
    followersCount: PropTypes.number,
    repositoriesCount: PropTypes.number,
    followingCount: PropTypes.number,
  }),
}

function ProfileStat({value, label}) {
  return (
    <div
      css={{
        display: 'inline-block',
        width: 80,
      }}
    >
      <Text size="heading" css={{margin: 0}}>
        {value}
      </Text>
      <Text tint="fadedExtra">
        <small>{label}</small>
      </Text>
    </div>
  )
}

ProfileStat.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
}

function OrganizationsSection({orgs}) {
  return (
    <Section>
      <Text size="superstandard">Organizations</Text>
      {orgs.map(org => (
        <a key={org.id} href={org.url} data-tooltip={org.login}>
          <Image
            src={org.avatarUrl}
            alt={`${org.login} Avatar`}
            css={{
              borderRadius: 3,
              margin: 5,
              width: 42,
              height: 42,
            }}
          />
        </a>
      ))}
    </Section>
  )
}

OrganizationsSection.propTypes = {
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
    }),
  ),
}

function ProfileUserConsumer() {
  return (
    <UserContext.Consumer>
      {user => <Profile user={user} />}
    </UserContext.Consumer>
  )
}

export default ProfileUserConsumer

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
