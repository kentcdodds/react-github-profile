import './global-styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from '@reach/router'
import ErrorBoundary from 'react-error-boundary'
import loadable from 'react-loadable'
import ThemeProvider from './shared/theme-provider'
import {IsolatedContainer, LoadingMessagePage} from './shared/pattern'
import * as GitHubContext from './github-client'

function LoadingFallback({error, pastDelay}) {
  if (error) {
    // our ErrorBoundary will catch this
    throw error
  }
  return <LoadingMessagePage>Loading Application</LoadingMessagePage>
}

const Home = loadable({
  loader: () => import('./screens/home'),
  loading: LoadingFallback,
})

const User = loadable({
  loader: () => import('./screens/user'),
  loading: LoadingFallback,
})

function ErrorFallback({error}) {
  return (
    <IsolatedContainer>
      <p>There was an error</p>
      <pre style={{maxWidth: 700}}>{JSON.stringify(error, null, 2)}</pre>
    </IsolatedContainer>
  )
}

function App() {
  return (
    <ThemeProvider>
      <GitHubContext.Provider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
            <Home path="/" />
            <User path="/:username" />
          </Router>
        </ErrorBoundary>
      </GitHubContext.Provider>
    </ThemeProvider>
  )
}

const ui = <App />
const container = document.getElementById('root')

ReactDOM.render(ui, container)
