import React, {Component, PropTypes} from 'react'
import ProfileFetcher from './components/profile-fetcher'
import RepoFilter from './components/repo-filter'
import RepoListFetcher from './components/repo-list-fetcher'

export default class User extends Component {
  static propTypes = {params: PropTypes.shape({username: PropTypes.string.isRequired})}
  static defaultProps = {params: {username: 'kentcdodds'}}
  state = {filter: ''}

  handleFilterUpdate = filter => {
    this.setState({filter}) // eslint-disable-line
  }

  render() {
    const {username} = this.props.params
    const {filter} = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <ProfileFetcher username={username} />
          </div>
          <div className="col-sm-9">
            <h3>Repositories</h3>
            <RepoFilter filter={filter} onUpdate={this.handleFilterUpdate} />
            <RepoListFetcher filter={filter} username={username} />
          </div>
        </div>
      </div>
    )
  }
}
