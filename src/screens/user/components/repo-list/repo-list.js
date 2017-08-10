import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import matchSorter from 'match-sorter'
import glamorous, {Time, Strong} from 'glamorous'

const fadedExtra = ({theme}) => ({color: theme.colors.fadedExtra})

const List = glamorous.ul({
  paddingLeft: 0,
  listStyle: 'none',
  marginTop: 0,
  marginBottom: 10,
})

const Item = glamorous.li(
  {
    padding: '25px 0',
  },
  ({theme}) => theme.common.borderBottom,
)

const Description = glamorous.p({margin: '0 0 10px'}, fadedExtra)
const Stats = glamorous.strong({marginLeft: 10}, fadedExtra)

function RepoList({repos, filter}) {
  const matchingRepos = matchSorter(repos, filter, {
    keys: [
      'name',
      {maxRanking: matchSorter.rankings.SIMPLE_MATCH, key: 'language'},
      {maxRanking: matchSorter.rankings.CONTAINS, key: 'description'},
    ],
  })
  return (
    <List>
      {matchingRepos.map(repo => <RepoListItem key={repo.id} repo={repo} />)}
    </List>
  )
}

RepoList.propTypes = {
  filter: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
}

function RepoListItem({repo}) {
  const timeUpdated = moment(repo.pushed_at).fromNow()
  return (
    <Item>
      <div className="pull-right">
        <Strong css={fadedExtra}>
          {repo.language}
        </Strong>
        <Stats>
          &#9734; {repo.stargazers_count}
        </Stats>
        <Stats>
          &#4292; {repo.forks_count}
        </Stats>
      </div>
      <div className="h4">
        <a href={repo.html_url}>
          {repo.name}
        </a>
      </div>
      <Description>
        {repo.description}
      </Description>
      <Time css={fadedExtra}>
        Updated {timeUpdated}
      </Time>
    </Item>
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

export default RepoList
