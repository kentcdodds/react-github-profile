import {Component, PropTypes} from 'react'
import axios from 'axios'
import * as utils from './fetch-utils'

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
    const promises = utils.arrayify(urls).map(url => axios.get(url))
    Promise.all(promises)
      .then(res => this.safeSetState({data: utils.getData(res), error: null, loading: false}))
      .catch(err => this.safeSetState({error: utils.getError(err), data: null, loading: false}))
  }

  safeSetState(...args) {
    this._isMounted && this.setState(...args)
  }

  render() {
    return this.props.children(this.state)
  }
}
