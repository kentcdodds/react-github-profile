import './global-styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from '@reach/router'
import ThemeProvider from './shared/theme-provider'
import Home from './screens/home'
import User from './screens/user'
import * as GitHubContext from './github-client'

function App() {
  return (
    <ThemeProvider>
      <GitHubContext.Provider>
        <Router>
          <Home path="/" />
          <User path="/:username" />
        </Router>
      </GitHubContext.Provider>
    </ThemeProvider>
  )
}

const ui = <App />
const container = document.getElementById('root')

ReactDOM.render(ui, container)
