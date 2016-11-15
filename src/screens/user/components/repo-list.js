/* eslint camelcase:0 */ // blame github
import React, {PropTypes} from 'react'
import moment from 'moment'
import {style, merge} from 'glamor'
import matchSorter from 'match-sorter'
import {borderBottom, colors} from './styles'

const fadedExtra = {color: colors.fadedExtra}

const styles = {
  list: style({
    paddingLeft: 0,
    listStyle: 'none',
    marginTop: 0,
    marginBottom: 10,
  }),
  item: merge(borderBottom, {padding: '25px 0'}),
  desc: merge({margin: '0 0 10px'}, fadedExtra),
  time: merge(fadedExtra),
  stats: merge({marginLeft: 10}, fadedExtra),
}

export default RepoList

function RepoList({repos, filter}) {
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

RepoList.propTypes = {
  filter: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
}

function RepoListItem({repo}) {
  const timeUpdated = moment(repo.pushed_at).fromNow()
  return (
    <li {...styles.item}>
      <div className="pull-right">
        <strong {...style(fadedExtra)}>{repo.language}</strong>
        <strong {...styles.stats}>&#9734; {repo.stargazers_count}</strong>
        <strong {...styles.stats}>&#4292; {repo.forks_count}</strong>
      </div>
      <div className="h4"><a href={repo.html_url}>{repo.name}</a></div>
      <p {...styles.desc}>{repo.description}</p>
      <time {...styles.time}>Updated {timeUpdated}</time>
    </li>
  )
}

RepoListItem.propTypes = {
  repo: PropTypes.shape({
    pushed_at: PropTypes.string,
    language: PropTypes.string,
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    html_url: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
}
