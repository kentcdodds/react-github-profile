import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Profile from './components/profile'
import RepoFilter from './components/repo-filter'
import RepoList from './components/repo-list'

export default class User extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({username: PropTypes.string.isRequired}),
    }),
  }
  static defaultProps = {match: {params: {username: 'kentcdodds'}}}
  state = {filter: ''}

  handleFilterUpdate = filter => {
    this.setState({filter})
  }

  render() {
    const {username} = this.props.match.params
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
