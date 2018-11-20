import './global-styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from '@reach/router'
import ErrorBoundary from 'react-error-boundary'
import loadable from 'react-loadable'
import ThemeProvider from './shared/theme-provider'
import {IsolatedContainer} from './shared/pattern'
import * as GitHubContext from './github-client'

function Loading(props) {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

const Home = loadable({
  loader: () => import('./screens/home'),
  loading: Loading,
  delay: 300,
})

const User = loadable({
  loader: () => import('./screens/user'),
  loading: Loading,
  delay: 300,
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
