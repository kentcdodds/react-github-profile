import {useContext, useReducer, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import * as GitHub from '../../../github-client'

function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({...state, ...newState}),
    initialState,
  )
}

function useSafeSetState(initialState) {
  const [state, setState] = useSetState(initialState)

  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => (mountedRef.current = false)
  }, [])
  const safeSetState = (...args) => mountedRef.current && setState(...args)

  return [state, safeSetState]
}

function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, setState] = useSafeSetState({
    loaded: false,
    fetching: false,
    data: null,
    error: null,
  })

  useEffect(() => {
    if (isEqual(previousInputs.current, [query, variables])) {
      return
    }
    setState({fetching: true})
    client
      .request(query, variables)
      .then(res =>
        setState({
          data: normalize(res),
          error: null,
          loaded: true,
          fetching: false,
        }),
      )
      .catch(error =>
        setState({
          error,
          data: null,
          loaded: false,
          fetching: false,
        }),
      )
  })

  const previousInputs = useRef()
  useEffect(() => {
    previousInputs.current = [query, variables]
  })

  return children(state)
}

Query.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  children: PropTypes.func.isRequired,
  normalize: PropTypes.func,
}

export default Query
