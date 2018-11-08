import './global-styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from '@reach/router'
import ThemeProvider from './shared/theme-provider'
import Home from './screens/home'
import User from './screens/user'
import GitHubClientContext from './github-client-context'
import githubClient from './github-client'

function App() {
  return (
    <div>
      <GitHubClientContext.Provider value={githubClient}>
        <ThemeProvider>
          <Router>
            <Home path="/" />
            <User path="/:username" />
          </Router>
        </ThemeProvider>
      </GitHubClientContext.Provider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
