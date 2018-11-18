import {useContext, useReducer, useEffect} from 'react'
import PropTypes from 'prop-types'
import * as GitHub from '../../../github-client'

function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      loaded: false,
      fetching: false,
      data: null,
      error: null,
    },
  )

  useEffect(
    () => {
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
    },
    [query, variables],
  )

  return children(state)
}

Query.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  children: PropTypes.func.isRequired,
  normalize: PropTypes.func,
}

export default Query
