// eslint-disable-next-line
import 'style-loader!css-loader!../global-styles.css'
import React from 'react'
import ThemeProvider from '../shared/theme-provider'
import User from '../screens/user'
import * as GitHubContext from '../github-client'
import data from './mock-query-response.json'

const fakeClient = {request: () => Promise.resolve(data)}

function DocsApp() {
  return (
    <div>
      <ThemeProvider>
        <GitHubContext.Provider client={fakeClient}>
          <User username="kentcdodds" />
        </GitHubContext.Provider>
      </ThemeProvider>
    </div>
  )
}

export default DocsApp
export {fakeClient}
