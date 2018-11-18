import {Component} from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import * as GitHub from '../../../github-client'

class Query extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    variables: PropTypes.object,
    children: PropTypes.func.isRequired,
    normalize: PropTypes.func,
  }
  static defaultProps = {
    normalize: data => data,
  }
  static contextType = GitHub.Context

  state = {loaded: false, fetching: false, data: null, error: null}

  componentDidMount() {
    this._isMounted = true
    this.query()
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.query, prevProps.query) ||
      !isEqual(this.props.variables, prevProps.variables)
    ) {
      this.query()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  query() {
    this.setState({fetching: true})
    const client = this.context
    client
      .request(this.props.query, this.props.variables)
      .then(res =>
        this.safeSetState({
          data: this.props.normalize(res),
          error: null,
          loaded: true,
          fetching: false,
        }),
      )
      .catch(error =>
        this.safeSetState({
          error,
          data: null,
          loaded: false,
          fetching: false,
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

export default Query
