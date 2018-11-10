/* @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import {navigate, createHistory} from '@reach/router'
import netlify from 'netlify-auth-providers'
import {GraphQLClient} from 'graphql-request'
import {PrimaryButton} from './shared/pattern'

const GitHubClientContext = React.createContext()
const {Provider, Consumer} = GitHubClientContext

async function authWithGitHub() {
  return new Promise((resolve, reject) => {
    var authenticator = new netlify({
      site_id: process.env.REACT_APP_NETLIFY_SITE_ID,
    })
    authenticator.authenticate(
      {provider: 'github', scope: 'public_repo,read:org,read:user'},
      function(err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      },
    )
  })
}

const history = createHistory(window)

class GitHubClientProvider extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {error: null}
    if (this.props.client) {
      this.state.client = this.props.client
    } else {
      const token = window.localStorage.getItem('github-token')
      if (token) {
        this.state.client = this.getClient(token)
      }
    }
  }
  componentDidMount() {
    if (!this.state.client) {
      navigate('/')
    }
    this.unsubscribeHistory = history.listen(() => {
      if (!this.state.client) {
        navigate('/')
      }
    })
  }
  componentWillUnmount() {
    this.unsubscribeHistory()
  }
  getClient = token => {
    const headers = {Authorization: `bearer ${token}`}
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers,
    })
    return Object.assign(client, {
      login: this.login,
      logout: this.logout,
    })
  }
  logout = () => {
    window.localStorage.removeItem('github-token')
    this.setState({client: null, error: null})
    navigate('/')
  }
  login = async () => {
    const data = await authWithGitHub().catch(error => {
      console.log('Oh no', error)
      this.setState({error})
    })
    window.localStorage.setItem('github-token', data.token)
    this.setState({client: this.getClient(data.token)})
  }
  render() {
    const {client, error} = this.state
    const {children} = this.props

    return client ? (
      <Provider value={client}>{children}</Provider>
    ) : (
      <div
        css={{
          marginTop: 250,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {error ? (
          <div>
            <p>Oh no! There was an error.</p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <PrimaryButton onClick={this.login}>
              Login with GitHub
            </PrimaryButton>
          </div>
        )}
      </div>
    )
  }
}

export {
  GitHubClientProvider as Provider,
  Consumer,
  GitHubClientContext as Context,
}

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
