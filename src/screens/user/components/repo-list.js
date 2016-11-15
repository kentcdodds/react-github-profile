import React, {Component, PropTypes} from 'react'
import {style} from 'glamor'
import matchSorter from 'match-sorter'
import {getRepos} from '../shared/github-api'
import RepoListItem from './repo-list-item'

const styles = {
  list: style({
    paddingLeft: 0,
    listStyle: 'none',
    marginTop: 0,
    marginBottom: 10,
  }),
}

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
      <ul {...styles.list}>
        {matchingRepos.map(repo => (
          <RepoListItem key={repo.id} repo={repo} />
        ))}
      </ul>
    )
  }
}
