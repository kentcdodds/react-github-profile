/* @jsx jsx */
import {jsx} from '@emotion/core'

import {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Column} from '../../shared/layout'
import {Text, PrimaryButton, ButtonLink} from '../../shared/pattern'
import {Context as GitHubContext} from '../../github-client'
import Profile from './components/profile'
import RepoFilter from './components/repo-filter'
import RepoList from './components/repo-list'
import UserContext from './user-context'

// this allows prettier to format things without changing the string contents
const gql = String.raw

const userQuery = gql`
  query getUserData($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(
        privacy: PUBLIC
        first: 100
        isFork: false
        ownerAffiliations: [COLLABORATOR, OWNER]
        orderBy: {field: PUSHED_AT, direction: DESC}
      ) {
        totalCount
        edges {
          node {
            id
            name
            description
            url
            pushedAt
            stargazers {
              totalCount
            }
            forkCount
            languages(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
      organizations(first: 100) {
        edges {
          node {
            avatarUrl
            id
            login
          }
        }
      }
    }
  }
`

function normalizeUserData(data) {
  const {
    user: {
      name,
      login,
      avatarUrl,
      followers: {totalCount: followersCount},
      following: {totalCount: followingCount},
      repositories: {totalCount: repositoriesCount, edges: reposData},
      organizations: {edges: orgsData},
    },
  } = data
  const repositories = reposData.map(r => ({
    ...r.node,
    languages: undefined,
    stargazersCount: r.node.stargazers.totalCount,
    language: r.node.languages.edges[0]
      ? r.node.languages.edges[0].node.name
      : 'Unknown',
  }))
  const organizations = orgsData.map(o => o.node)
  return {
    name,
    login,
    avatarUrl,
    followersCount,
    followingCount,
    repositoriesCount,
    repositories,
    organizations,
  }
}

function User({username}) {
  const {resource, logout} = useContext(GitHubContext)
  const [filter, setFilter] = useState('')
  const data = resource.read({
    query: userQuery,
    variables: {username},
    key: username,
    normalize: normalizeUserData,
  })

  return (
    <UserContext.Provider value={data}>
      <Container>
        <Row>
          <Column width="3">
            <Profile />
            <PrimaryButton
              css={{marginTop: 20, width: '100%'}}
              onClick={logout}
            >
              Logout
            </PrimaryButton>
            <ButtonLink css={{marginTop: 20, width: '100%'}} to="/">
              Try another
            </ButtonLink>
          </Column>
          <Column width="9">
            <Text size="subheading">Repositories</Text>
            <RepoFilter filter={filter} onUpdate={setFilter} />
            <RepoList filter={filter} />
          </Column>
        </Row>
      </Container>
    </UserContext.Provider>
  )
}
User.propTypes = {
  username: PropTypes.string,
}

export default User

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
