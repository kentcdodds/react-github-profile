import PropTypes from 'prop-types'
import React from 'react'
import styled, {css} from 'react-emotion/macro'
import ReactTooltip from 'react-tooltip'
import {Section, Text, Image} from '../../../shared/pattern'
import UserContext from '../user-context'

const StatsSection = styled(Section)({textAlign: 'center'})

const StatsValue = styled(Text)({
  margin: 0,
})
StatsValue.defaultProps = {heading: true}

const StatsLabel = styled(Text)().withComponent('small')
StatsLabel.defaultProps = {fadedExtra: true}

const OrgImg = styled(Image)({
  borderRadius: 3,
  margin: 5,
  width: 42,
  height: 42,
})
OrgImg.defaultProps = {alt: 'Organization Avatar'}

const Login = styled(Text)({
  fontWeight: 300,
  fontSize: 20,
})
Login.defaultProps = {standard: true, faded: true}

function Profile({user}) {
  return (
    <div>
      <Section>
        <Image responsive rounded alt="User Avatar" src={user.avatarUrl} />
        <Text heading>{user.name}</Text>
        <Login>{user.login}</Login>
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
    <StatsSection>
      <ProfileStat value={user.followersCount} label="followers" />
      <ProfileStat value={user.repositoriesCount} label="repositories" />
      <ProfileStat value={user.followingCount} label="following" />
    </StatsSection>
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
      <StatsValue>{value}</StatsValue>
      <StatsLabel>{label}</StatsLabel>
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
        <OrgImg key={org.id} src={org.avatarUrl} data-tip={org.login} />
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
