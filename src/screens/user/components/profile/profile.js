import PropTypes from 'prop-types'
import React from 'react'
import styled, {css} from 'react-emotion'
import ReactTooltip from 'react-tooltip'
import {Section, Text, Image} from '../../../../shared/pattern'

const StatsSection = styled(Section)({textAlign: 'center'})

const StatsValue = styled(Text, {
  withProps: {heading: true},
})({
  margin: 0,
})

const StatsLabel = styled(Text, {
  withProps: {fadedExtra: true},
})().withComponent('small')

const OrgImg = styled(Image)({
  borderRadius: 3,
  margin: 5,
  width: 42,
  height: 42,
}).withProps({alt: 'Organization Avatar'})

const Login = styled(Text, {
  withProps: {standard: true, faded: true},
})({
  fontWeight: 300,
  fontSize: 20,
})

export default Profile

function Profile({user, orgs}) {
  return (
    <div>
      <Section>
        <Image responsive rounded alt="User Avatar" src={user.avatar_url} />
        <Text heading>{user.name}</Text>
        <Login>{user.login}</Login>
      </Section>
      <ProfileStatsSection user={user} />
      {!!orgs.length && <OrganizationsSection orgs={orgs} />}
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  orgs: PropTypes.array.isRequired,
}

function ProfileStatsSection({user}) {
  return (
    <StatsSection>
      <ProfileStat value={user.followers} label="followers" />
      <ProfileStat value={user.public_repos} label="repositories" />
      <ProfileStat value={user.following} label="following" />
    </StatsSection>
  )
}

ProfileStatsSection.propTypes = {
  user: PropTypes.shape({
    followers: PropTypes.number,
    public_repos: PropTypes.number,
    following: PropTypes.number,
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
        <OrgImg key={org.id} src={org.avatar_url} data-tip={org.login} />
      ))}
      <ReactTooltip effect="solid" />
    </Section>
  )
}

OrganizationsSection.propTypes = {
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar_url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
    }),
  ),
}
