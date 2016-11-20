import React, {Component} from 'react'
import {styleSheet, flush} from 'glamor'

export default class GlamorStyles extends Component {
  componentDidMount() {
    flush()
  }
  render() {
    const rules = styleSheet.rules()
    return (
      <pre>
        <code>
          {`${JSON.stringify(rules, null, 2)}`}
        </code>
      </pre>
    )
  }
}
