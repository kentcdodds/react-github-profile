import React from 'react'
import {ThemeProvider} from 'glamorous'

const theme = {
  colors: {
    faded: '#666',
    fadedExtra: '#888',
  },
}

export default props => <ThemeProvider theme={theme} {...props} />
