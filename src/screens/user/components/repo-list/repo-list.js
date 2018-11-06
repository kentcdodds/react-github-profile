import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import matchSorter from 'match-sorter'
import styled, {keyframes, css} from 'react-emotion'
import {Text, Anchor} from '../../../../shared/pattern'

const List = styled('ul')({
  paddingLeft: 0,
  listStyle: 'none',
  marginTop: 0,
  marginBottom: 10,
})

const Item = styled('li')(
  {
    padding: '25px 0',
  },
  ({theme}) => theme.common.borderBottom,
)

const FadedText = Text.withProps({fadedExtra: true})
const StrongFadedText = FadedText.withComponent('strong')
const Description = styled(FadedText)({
  margin: '0 0 10px',
}).withComponent('p')
const Stats = styled(StrongFadedText)({marginLeft: 10})

const bounce = keyframes({
  '0%': {transform: 'translateY(0px)'},
  '25%': {transform: 'translateY(3px)'},
  '75%': {transform: 'translateY(-3px)'},
  '100%': {transform: 'translateY(0px)'},
})
const RepoName = styled(Text, {
  withProps: {superstandard: true},
})({
  display: 'inline-block',
  '&:hover': {
    animation: `1s infinite ${bounce} linear`,
  },
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
    <List>
      {matchingRepos.map(repo => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
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
      <div
        className={css({
          float: 'right',
        })}
      >
        <StrongFadedText>{repo.language}</StrongFadedText>
        <Stats>&#9734; {repo.stargazers_count}</Stats>
        <Stats>&#4292; {repo.forks_count}</Stats>
      </div>
      <div>
        <Anchor href={repo.html_url}>
          <RepoName>{repo.name}</RepoName>
        </Anchor>
      </div>
      <Description>{repo.description}</Description>
      <time>
        <Text fadedExtra>Updated {timeUpdated}</Text>
      </time>
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
