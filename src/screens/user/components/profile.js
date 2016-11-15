import React, {Component, PropTypes} from 'react'
import {style, merge} from 'glamor'
import ReactTooltip from 'react-tooltip'
import {getUserData} from '../shared/github-api'
import {borderBottom, sectionPadding, colors} from './styles'

const styles = {
  login: style({
    fontWeight: 300,
    fontSize: 20,
    color: colors.faded,
  }),
  section: merge(borderBottom, sectionPadding),
  statsSection: style({
    textAlign: 'center',
  }),
  statsItem: style({
    display: 'inline-block',
    width: 80,
  }),
  statsValue: style({margin: 0}),
  statsLabel: style({color: '#888'}),
  orgImg: style({
    borderRadius: 3,
    margin: 5,
    width: 42,
    height: 42,
  }),
}

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
        <section {...styles.section}>
          <img
            src={user.avatar_url}
            alt="User Avatar"
            className="img-rounded img-responsive"
          />
          <div className="h2">{user.name}</div>
          <div className="h5" {...styles.login}>{user.login}</div>
        </section>
        <ProfileStatsSection user={user} />
        <OrganizationsSection orgs={orgs} />
      </div>
    )
  }
}

function ProfileStatsSection({user}) {
  return (
    <section {...merge(styles.statsSection, styles.section)}>
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
    <span {...styles.statsItem}>
      <div className="h2" {...styles.statsValue}>{value}</div>
      <small {...styles.statsLabel}>{label}</small>
    </span>
  )
}

ProfileStat.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
}

function OrganizationsSection({orgs}) {
  return (
    <section {...styles.section}>
      <div className="h4">Organizations</div>
      {orgs.map(org => (
        <img
          key={org.id}
          src={org.avatar_url}
          alt="Organization Avatar"
          data-tip={org.login}
          {...styles.orgImg}
        />
      ))}
      <ReactTooltip />
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
