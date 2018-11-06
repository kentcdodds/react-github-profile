import PropTypes from 'prop-types'
import {Component} from 'react'
import * as utils from './utils'

export default class Fetch extends Component {
  static propTypes = {
    url: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]).isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {error: null, data: null, loading: true}

  componentDidMount() {
    this._isMounted = true
    this.fetch()
  }

  componentWillReceiveProps({url: newUrl}) {
    if (!utils.urlsAreEqual(newUrl, this.props.url)) {
      this.setState({loading: true})
      this.fetch(newUrl)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  fetch(urls = this.props.url) {
    const promises = utils
      .arrayify(urls)
      .map(url => fetch(url).then(r => r.json()))
    Promise.all(promises)
      .then(res =>
        this.safeSetState({
          data: utils.getData(res),
          error: null,
          loading: false,
        }),
      )
      .catch(error =>
        this.safeSetState({
          error,
          data: null,
          loading: false,
        }),
      )
  }

  safeSetState(...args) {
    this._isMounted && this.setState(...args)
  }

  render() {
    return this.props.children(this.state)
  }
}
