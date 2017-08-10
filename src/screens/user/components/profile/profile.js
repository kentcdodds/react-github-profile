import PropTypes from 'prop-types'
import React from 'react'
import glamorous, {Div} from 'glamorous'
import ReactTooltip from 'react-tooltip'
import {Section, H5, H2, H4} from '../../../../shared/pattern'

const StatsSection = glamorous(Section)({textAlign: 'center'})

const StatsValue = glamorous(H2)({margin: 0}).withComponent('div')

const StatsLabel = glamorous.small(({theme}) => ({
  color: theme.colors.fadedExtra,
}))

const OrgImg = glamorous
  .img({
    borderRadius: 3,
    margin: 5,
    width: 42,
    height: 42,
  })
  .withProps({alt: 'Organization Avatar'})

const Login = glamorous(H5)(
  {
    fontWeight: 300,
    fontSize: 20,
  },
  ({theme}) => ({colors: theme.colors.faded}),
).withComponent('div')

const UserAvatar = glamorous('img', {withProps: {alt: 'User Avatar'}})(
  'img-rounded img-responsive',
)

const UserName = glamorous(H2)().withComponent('div')

const OrgSectionTitle = glamorous(H4)()
  .withComponent('div')
  .withProps({children: 'Organizations'})

export default Profile

function Profile({user, orgs}) {
  return (
    <div>
      <Section>
        <UserAvatar src={user.avatar_url} />
        <UserName>
          {user.name}
        </UserName>
        <Login>
          {user.login}
        </Login>
      </Section>
      <ProfileStatsSection user={user} />
      {orgs.length && <OrganizationsSection orgs={orgs} />}
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired, // eslint-disable-line camelcase
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
    public_repos: PropTypes.number, // eslint-disable-line camelcase
    following: PropTypes.number,
  }),
}

function ProfileStat({value, label}) {
  return (
    <Div display="inline-block" width={80}>
      <StatsValue>
        {value}
      </StatsValue>
      <StatsLabel>
        {label}
      </StatsLabel>
    </Div>
  )
}

ProfileStat.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
}

function OrganizationsSection({orgs}) {
  return (
    <Section>
      <OrgSectionTitle />
      {orgs.map(org =>
        <OrgImg key={org.id} src={org.avatar_url} data-tip={org.login} />,
      )}
      <ReactTooltip effect="solid" />
    </Section>
  )
}

OrganizationsSection.propTypes = {
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar_url: PropTypes.string.isRequired, // eslint-disable-line camelcase
      login: PropTypes.string.isRequired,
    }),
  ),
}
