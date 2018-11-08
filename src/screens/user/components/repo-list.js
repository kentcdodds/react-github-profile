import React from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes, css} from 'react-emotion/macro'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import matchSorter from 'match-sorter'
import {Text, Anchor} from '../../../shared/pattern'
import UserContext from '../user-context'

const bounce = keyframes({
  '0%': {transform: 'translateY(0px)'},
  '25%': {transform: 'translateY(3px)'},
  '75%': {transform: 'translateY(-3px)'},
  '100%': {transform: 'translateY(0px)'},
})

function RepoList({repos, filter}) {
  const matchingRepos = matchSorter(repos, filter, {
    keys: [
      'name',
      {maxRanking: matchSorter.rankings.SIMPLE_MATCH, key: 'language'},
      {maxRanking: matchSorter.rankings.CONTAINS, key: 'description'},
    ],
  })
  return (
    <ul
      className={css({
        paddingLeft: 0,
        listStyle: 'none',
        marginTop: 0,
        marginBottom: 10,
      })}
    >
      {matchingRepos.map(repo => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </ul>
  )
}

RepoList.propTypes = {
  filter: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

const ListItem = styled.li(
  {padding: '25px 0'},
  ({theme}) => theme.common.borderBottom,
)

const Stat = styled(Text)({marginLeft: 10}).withComponent('strong')
Stat.defaultProps = {fadedExtra: true}

function RepoListItem({repo}) {
  const timeUpdated = distanceInWordsToNow(repo.pushedAt)
  return (
    <ListItem>
      <div
        className={css({
          float: 'right',
        })}
      >
        <Stat>{repo.language}</Stat>
        <Stat>&#9734; {repo.stargazersCount}</Stat>
        <Stat>&#4292; {repo.forksCount}</Stat>
      </div>
      <div>
        <Anchor href={repo.url}>
          <Text
            superstandard
            className={css({
              display: 'inline-block',
              '&:hover': {
                animation: `1s infinite ${bounce} linear`,
              },
            })}
          >
            {repo.name}
          </Text>
        </Anchor>
      </div>
      <p>
        <Text fadedExtra className={css({margin: '0 0 10px'})}>
          {repo.description}
        </Text>
      </p>
      <time>
        <Text fadedExtra>Updated {timeUpdated} ago</Text>
      </time>
    </ListItem>
  )
}

RepoListItem.propTypes = {
  repo: PropTypes.shape({
    pushedAt: PropTypes.string,
    language: PropTypes.string,
    stargazersCount: PropTypes.number,
    forksCount: PropTypes.number,
    url: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
}

function RepoListFetcher(props) {
  return (
    <UserContext.Consumer>
      {userData => <RepoList repos={userData.repositories} {...props} />}
    </UserContext.Consumer>
  )
}

export default RepoListFetcher
