import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled, {css} from 'react-emotion'
import {Input, PrimaryButton} from '../../shared/pattern'

const SubmitButton = styled(PrimaryButton)({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}).withProps({type: 'submit', children: 'Go'})

const GroupedInput = styled(Input)({
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
      <section
        className={css({
          paddingTop: 200,
          textAlign: 'center',
        })}
      >
        <form
          onSubmit={this.handleSubmit}
          className={css({
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 240,
            margin: 'auto',
          })}
        >
          <GroupedInput
            type="text"
            placeholder="Enter a GitHub username"
            autoFocus
            minWidth={190}
            innerRef={ref => (this._input = ref)}
          />
          <SubmitButton />
        </form>
      </section>
    )
  }
}
