import React, {Component, PropTypes} from 'react'
import Profile from './components/profile'
import RepoFilter from './components/repo-filter'
import RepoList from './components/repo-list'

export default class User extends Component {
  static propTypes = {username: PropTypes.string.isRequired}
  static defaultProps = {username: 'kentcdodds'}
  state = {filter: ''}

  handleFilterUpdate = filter => {
    this.setState({filter}) // eslint-disable-line
  }

  render() {
    const {username} = this.props
    const {filter} = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Profile username={username} />
          </div>
          <div className="col-sm-9">
            <h3>Repositories</h3>
            <RepoFilter filter={filter} onUpdate={this.handleFilterUpdate} />
            <RepoList filter={filter} username={username} />
          </div>
        </div>
      </div>
    )
  }
}
