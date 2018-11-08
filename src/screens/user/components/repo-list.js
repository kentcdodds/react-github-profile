import React from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'react-emotion/macro'
import moment from 'moment'
import matchSorter from 'match-sorter'
import {Text, Anchor} from '../../../shared/pattern'
import UserContext from '../user-context'

const List = styled.ul({
  paddingLeft: 0,
  listStyle: 'none',
  marginTop: 0,
  marginBottom: 10,
})

const Item = styled.li(
  {padding: '25px 0'},
  ({theme}) => theme.common.borderBottom,
)

const FadedText = styled(Text)()
FadedText.defaultProps = {fadedExtra: true}
const StrongFadedText = FadedText.withComponent('strong')
const Description = styled(FadedText)({margin: '0 0 10px'}).withComponent('p')
const Stats = styled(StrongFadedText)({marginLeft: 10})

const bounce = keyframes({
  '0%': {transform: 'translateY(0px)'},
  '25%': {transform: 'translateY(3px)'},
  '75%': {transform: 'translateY(-3px)'},
  '100%': {transform: 'translateY(0px)'},
})
const RepoName = styled(Text)({
  display: 'inline-block',
  '&:hover': {
    animation: `1s infinite ${bounce} linear`,
  },
})
RepoName.defaultProps = {superstandard: true}

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
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

function RepoListItem({repo}) {
  const timeUpdated = moment(repo.pushedAt).fromNow()
  return (
    <Item>
      <div
        style={{
          float: 'right',
        }}
      >
        <StrongFadedText>{repo.language}</StrongFadedText>
        <Stats>&#9734; {repo.stargazersCount}</Stats>
        <Stats>&#4292; {repo.forksCount}</Stats>
      </div>
      <div>
        <Anchor href={repo.url}>
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
