import PropTypes from 'prop-types'
import React from 'react'
import {css} from 'react-emotion/macro'
import ReactTooltip from 'react-tooltip'
import {Section, Text, Image} from '../../../shared/pattern'
import UserContext from '../user-context'

function Profile({user}) {
  return (
    <div>
      <Section>
        <Image responsive rounded alt="User Avatar" src={user.avatarUrl} />
        <Text heading>{user.name}</Text>
        <Text standard faded className={css({fontWeight: 300, fontSize: 20})}>
          {user.login}
        </Text>
      </Section>
      <ProfileStatsSection user={user} />
      {!!user.organizations.length && (
        <OrganizationsSection orgs={user.organizations} />
      )}
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
    <Section className={css({textAlign: 'center'})}>
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
      className={css({
        display: 'inline-block',
        width: 80,
      })}
    >
      <Text className={css({margin: 0})} heading>
        {value}
      </Text>
      <Text fadedExtra>
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
      <Text superstandard>Organizations</Text>
      {orgs.map(org => (
        <Image
          key={org.id}
          src={org.avatarUrl}
          data-tip={org.login}
          alt={`${org.login} Avatar`}
          className={css({
            borderRadius: 3,
            margin: 5,
            width: 42,
            height: 42,
          })}
        />
      ))}
      <ReactTooltip effect="solid" />
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

function ProfileFetcher() {
  return (
    <UserContext.Consumer>
      {user => <Profile user={user} />}
    </UserContext.Consumer>
  )
}

export default ProfileFetcher
