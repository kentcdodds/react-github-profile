import PropTypes from 'prop-types'
import React, {Component} from 'react'
import glamorous, {Form, Section} from 'glamorous'
import {Input, PrimaryButton} from '../../shared/pattern'

const SubmitButton = glamorous(PrimaryButton)({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}).withProps({type: 'submit', children: 'Go'})

const GroupedInput = glamorous(Input)({
  borderRight: 'none',
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
})

export default class Home extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  handleSubmit = e => {
    e.preventDefault()
    const username = this._input.value.trim()
    this.context.router.history.push(`/${username}`)
  }

  render() {
    return (
      <Section paddingTop={200} textAlign="center">
        <Form
          display="flex"
          justifyContent="center"
          maxWidth={240}
          margin="auto"
          onSubmit={this.handleSubmit}
        >
          <GroupedInput
            type="text"
            placeholder="Enter a GitHub username"
            autoFocus
            minWidth={190}
            innerRef={ref => (this._input = ref)}
          />
          <SubmitButton />
        </Form>
      </Section>
    )
  }
}
