import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './screens/home'
import User from './screens/user'

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/:username" component={User} />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
