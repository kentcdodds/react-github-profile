import './global-styles.css'
import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {Router} from '@reach/router'
import ErrorBoundary from 'react-error-boundary'
import ThemeProvider from './shared/theme-provider'
import {IsolatedContainer} from './shared/pattern'
import {Loading} from './shared/loading'
import Home from './screens/home'
import User from './screens/user'
import * as GitHubContext from './github-client'

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
          <Suspense
            maxDuration={2000}
            fallback={
              <IsolatedContainer>
                <Loading />
              </IsolatedContainer>
            }
          >
            <Router>
              <Home path="/" />
              <User path="/:username" />
            </Router>
          </Suspense>
        </ErrorBoundary>
      </GitHubContext.Provider>
    </ThemeProvider>
  )
}

const ui = <App />
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(ui)
