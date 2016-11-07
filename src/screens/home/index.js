import React, {Component} from 'react'

export default class Home extends Component {
  handleSubmit = e => {
    /* eslint no-invalid-this:0 */
    e.preventDefault()
    const username = this._input.value.trim()
    this.context.router.transitionTo(`/${username}`)
  }

  render() {
    return (
      <section>
        <form
          role="form"
          onSubmit={this.handleSubmit}
        >
          <div>
            <div>
              <input
                autoFocus
                type="text"
                placeholder="Enter a GitHub user..."
                ref={ref => (this._input = ref)}
              />
            </div>
          </div>
          <button type="submit">
            Go
          </button>
        </form>
      </section>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired,
}
