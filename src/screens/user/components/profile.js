import React, {Component, PropTypes} from 'react'
import Tooltip from 'react-tooltip'
import {getUserData} from '../shared/github-api'

export default class Profile extends Component {
  static defaultProps = {getUserData}
  static propTypes = {
    username: PropTypes.string.isRequired,
    getUserData: PropTypes.func,
  }
  state = {user: {}, orgs: []}

  getUser() {
    const {username} = this.props
    this.props.getUserData(username)
      .then(({user, orgs}) => {
        this.setState({user, orgs})
      })
  }

  componentWillMount() {
    this.getUser()
  }

  render() {
    const {user, orgs} = this.state
    return (
      <div>
        <section>
          <img
            src={user.avatar_url}
            alt="User Avatar"
          />
          <h2>{user.name}</h2>
          <h5>{user.login}</h5>
        </section>
        <ProfileStatsSection user={user} />
        <OrganizationsSection orgs={orgs} />
      </div>
    )
  }
}

function ProfileStatsSection({user}) {
  return (
    <section>
      <ProfileStat value={user.followers} label="followers" />
      <ProfileStat value={user.public_repos} label="repositories" />
      <ProfileStat value={user.following} label="following" />
    </section>
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
    <span>
      <h2>{value}</h2>
      <small>{label}</small>
    </span>
  )
}

ProfileStat.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
}

function OrganizationsSection({orgs}) {
  return (
    <section>
      <h4>Organizations</h4>
      {orgs.map(org => (
        <img
          key={org.id}
          src={org.avatar_url}
          alt="Organization Avatar"
          data-tip={org.login}
        />
      ))}
      <Tooltip effect="solid" />
    </section>
  )
}

OrganizationsSection.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar_url: PropTypes.string.isRequired, // eslint-disable-line camelcase
    login: PropTypes.string.isRequired,
  })),
}
