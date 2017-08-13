import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import matchSorter from 'match-sorter'
import {Text, Anchor} from '../../../../shared/pattern'
import glamorous, {Time, Div} from 'glamorous'

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

const FadedText = Text.withProps({fadedExtra: true})
const StrongFadedText = FadedText.withComponent('strong')
const Description = glamorous(FadedText)({
  margin: '0 0 10px',
}).withComponent('p')
const Stats = glamorous(StrongFadedText)({marginLeft: 10})

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
      <Div float="right">
        <StrongFadedText>
          {repo.language}
        </StrongFadedText>
        <Stats>
          &#9734; {repo.stargazers_count}
        </Stats>
        <Stats>
          &#4292; {repo.forks_count}
        </Stats>
      </Div>
      <div>
        <Anchor href={repo.html_url}>
          <Text superstandard>
            {repo.name}
          </Text>
        </Anchor>
      </div>
      <Description>
        {repo.description}
      </Description>
      <Time>
        <Text fadedExtra>
          Updated {timeUpdated}
        </Text>
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
