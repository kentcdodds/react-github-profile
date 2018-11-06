import React, {Component} from 'react'
import {navigate} from '@reach/router'
import styled, {css} from 'react-emotion'
import {Input, PrimaryButton} from '../../shared/pattern'

const SubmitButton = styled(PrimaryButton)({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
})
SubmitButton.defaultProps = {type: 'submit', children: 'Go'}

const GroupedInput = styled(Input)({
  borderRight: 'none',
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
})

export default class Home extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const username = this._input.value.trim()
    navigate(`/${username}`)
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
