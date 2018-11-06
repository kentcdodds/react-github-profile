import './global-styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from '@reach/router'
import ThemeProvider from './shared/theme-provider'
import Home from './screens/home'
import User from './screens/user'

function App() {
  return (
    <div>
      <ThemeProvider>
        <Router>
          <Home path="/" />
          <User path="/:username" />
        </Router>
      </ThemeProvider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
