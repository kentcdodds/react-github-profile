import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ThemeProvider from './shared/theme-provider'
import Home from './screens/home'
import User from './screens/user'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/:username" component={User} />
        </div>
      </ThemeProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
