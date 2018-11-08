import React from 'react'
import {authWithGitHub, gitHubSignOut} from './firebase'
import {GraphQLClient} from 'graphql-request'

const GitHubClientContext = React.createContext()

function getClient(token) {
  const headers = {Authorization: `bearer ${token}`}
  return new GraphQLClient('https://api.github.com/graphql', {headers})
}

class GitHubClientProvider extends React.Component {
  state = {client: null, error: null}
  componentDidMount() {
    const token =
      window.localStorage.getItem('github-token') ||
      process.env.REACT_APP_GITHUB_TOKEN
    if (token) {
      this.setState({client: getClient(token)})
    }
  }
  handleSignoutClick = () => {
    window.localStorage.removeItem('github-token')
    this.setState({client: null, error: null})
    gitHubSignOut()
  }
  handleLoginClick = async () => {
    const token = await authWithGitHub().catch(error => {
      console.log('Oh no', error)
      this.setState({error})
    })
    window.localStorage.setItem('github-token', token)
    this.setState({client: getClient(token)})
  }
  render() {
    const {client, error} = this.state
    const {children} = this.props

    return client ? (
      <GitHubClientContext.Provider value={client}>
        <button onClick={this.handleSignoutClick}>Sign Out</button>
        {children}
      </GitHubClientContext.Provider>
    ) : error ? (
      <div>
        Oh no! Error! <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    ) : (
      <div>
        You have no client!
        <button onClick={this.handleLoginClick}>Sign In Here!</button>
      </div>
    )
  }
}

const {Consumer} = GitHubClientContext

export {
  GitHubClientProvider as Provider,
  Consumer,
  GitHubClientContext as Context,
}
