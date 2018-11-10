/* @jsx jsx */
import {jsx} from '@emotion/core'

import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import matchSorter from 'match-sorter'
import {Text, Anchor} from '../../../shared/pattern'
import UserContext from '../user-context'

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
      css={{
        paddingLeft: 0,
        listStyle: 'none',
        marginTop: 0,
        marginBottom: 10,
      }}
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
Stat.defaultProps = {tint: 'fadedExtra'}

function RepoListItem({repo}) {
  const timeUpdated = distanceInWordsToNow(repo.pushedAt)
  return (
    <ListItem>
      <div css={{float: 'right'}}>
        <Stat>{repo.language}</Stat>
        <Stat>&#9734; {repo.stargazersCount}</Stat>
        <Stat>&#4292; {repo.forksCount}</Stat>
      </div>
      <div>
        <Anchor href={repo.url}>
          <Text size="superstandard" css={{display: 'inline-block'}}>
            {repo.name}
          </Text>
        </Anchor>
      </div>
      <p>
        <Text tint="fadedExtra" css={{margin: '0 0 10px'}}>
          {repo.description}
        </Text>
      </p>
      <time>
        <Text tint="fadedExtra">Updated {timeUpdated} ago</Text>
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

function RepoListUserConsumer(props) {
  return (
    <UserContext.Consumer>
      {userData => <RepoList repos={userData.repositories} {...props} />}
    </UserContext.Consumer>
  )
}

export default RepoListUserConsumer

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
