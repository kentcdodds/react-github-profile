import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {style} from 'glamor'

const styles = {
  home: style({
    paddingTop: 200,
    textAlign: 'center',
  }),
  button: style({
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }),
  input: style({minWidth: 190}),
}

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
      <section className="container home" {...styles.home}>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter a GitHub username"
                className="form-control"
                autoFocus
                ref={ref => (this._input = ref)}
                {...styles.input}
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn btn-primary"
                  {...styles.button}
                >
                  Go
                </button>
              </span>
            </div>
          </div>
        </form>
      </section>
    )
  }
}
