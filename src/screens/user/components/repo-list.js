import React, {Component, PropTypes} from 'react'
import matchSorter from 'match-sorter'
import {getRepos} from '../shared/github-api'
import RepoListItem from './repo-list-item'

export default class RepoList extends Component {
  static propTypes = {
    getRepos: PropTypes.func,
    filter: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }
  static defaultProps = {getRepos}
  state = {repos: []}

  getRepos() {
    const {username} = this.props
    this.props.getRepos(username).then(repos => {
      this.setState({repos})
    })
  }

  componentWillMount() {
    this.getRepos()
  }

  render() {
    const {repos} = this.state
    const {filter} = this.props
    const matchingRepos = matchSorter(repos, filter, {
      keys: ['name', 'language', 'description'],
    })
    return (
      <ul>
        {matchingRepos.map(repo => (
          <RepoListItem key={repo.id} repo={repo} />
        ))}
      </ul>
    )
  }
}
