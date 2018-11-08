import React from 'react'
import {render as rtlRender, wait} from 'react-testing-library'
import GitHubClientContext from '../../../../github-client-context'
import Query from '../query'

const fakeResponse = {fakeData: {}}
const fakeClient = {request: jest.fn(() => Promise.resolve(fakeResponse))}

beforeEach(() => {
  fakeClient.request.mockClear()
})

function renderQuery({
  client = fakeClient,
  children = jest.fn(() => null),
  query = '',
  variables = {},
  ...options
} = {}) {
  const props = {query, variables, children}
  const utils = rtlRender(
    <GitHubClientContext.Provider value={client}>
      <Query {...props} />
    </GitHubClientContext.Provider>,
    options,
  )
  return {
    ...utils,
    rerender: options =>
      renderQuery({
        container: utils.container,
        children,
        query,
        variables,
        ...options,
      }),
    client,
    query,
    variables,
    children,
  }
}

test('query makes requests to the client on mount', async () => {
  const {children, client, variables, query} = renderQuery()
  expect(children).toHaveBeenCalledTimes(1)
  expect(children).toHaveBeenCalledWith({
    data: null,
    error: null,
    fetching: true,
    loaded: false,
  })
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(query, variables)

  children.mockClear()
  await wait()

  expect(children).toHaveBeenCalledTimes(1)
  expect(children).toHaveBeenCalledWith({
    data: fakeResponse,
    error: null,
    fetching: false,
    loaded: true,
  })
})

test('does not request if rerendered and nothing changed', async () => {
  const {children, client, rerender} = renderQuery()
  await wait()
  children.mockClear()
  client.request.mockClear()
  rerender()
  await wait()
  expect(client.request).toHaveBeenCalledTimes(0)
  expect(children).toHaveBeenCalledTimes(1) // does still re-render children.
})

test('makes request if rerendered with new variables', async () => {
  const {client, query, rerender} = renderQuery({
    variables: {username: 'fred'},
  })
  await wait()
  client.request.mockClear()
  const newVariables = {username: 'george'}
  rerender({variables: newVariables})
  await wait()
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(query, newVariables)
})

test('makes request if rerendered with new query', async () => {
  const {client, variables, rerender} = renderQuery({
    query: `query neat() {}`,
  })
  await wait()
  client.request.mockClear()
  const newQuery = `query nice() {}`
  rerender({query: newQuery})
  await wait()
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(newQuery, variables)
})
