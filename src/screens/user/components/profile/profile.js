import PropTypes from 'prop-types'
import React from 'react'
import glamorous, {Div} from 'glamorous'
import ReactTooltip from 'react-tooltip'
import Section from '../section'

const StatsSection = glamorous(Section)({textAlign: 'center'})
const StatsValue = glamorous.div('h2', {margin: 0})
const StatsLabel = glamorous.small(({theme}) => ({
  color: theme.colors.fadedExtra,
}))
const OrgImg = glamorous.img({
  borderRadius: 3,
  margin: 5,
  width: 42,
  height: 42,
})
const Login = glamorous.div(
  'h5',
  {
    fontWeight: 300,
    fontSize: 20,
  },
  ({theme}) => ({colors: theme.colors.faded}),
)

export default Profile

function Profile({user, orgs}) {
  return (
    <div>
      <Section>
        <img
          src={user.avatar_url}
          alt="User Avatar"
          className="img-rounded img-responsive"
        />
        <div className="h2">
          {user.name}
        </div>
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
      <div className="h4">Organizations</div>
      {orgs.map(org =>
        <OrgImg
          key={org.id}
          src={org.avatar_url}
          alt="Organization Avatar"
          data-tip={org.login}
        />,
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
