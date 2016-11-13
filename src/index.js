/* eslint func-style:0 */
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Match} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './screens/home'
import User from './screens/user'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Match
          pattern="/"
          exactly
          component={Home}
        />
        <Match pattern="/:username" component={User} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
