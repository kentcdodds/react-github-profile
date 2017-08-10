import PropTypes from 'prop-types'
import React, {Component} from 'react'
import glamorous, {Section, Input} from 'glamorous'

const SubmitButton = glamorous
  .button(
    {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    'btn btn-primary',
  )
  .withProps({type: 'submit', children: 'Go'})

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
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <Input
                type="text"
                placeholder="Enter a GitHub username"
                className="form-control"
                autoFocus
                minWidth={190}
                innerRef={ref => (this._input = ref)}
              />
              <span className="input-group-btn">
                <SubmitButton />
              </span>
            </div>
          </div>
        </form>
      </Section>
    )
  }
}
