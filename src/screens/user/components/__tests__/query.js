import React from 'react'
import {render as rtlRender, wait, flushEffects} from 'react-testing-library'
import * as GitHubClient from '../../../../github-client'
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
  normalize,
  ...options
} = {}) {
  const props = {query, variables, children, normalize}
  const utils = rtlRender(
    <GitHubClient.Provider client={client}>
      <Query {...props} />
    </GitHubClient.Provider>,
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
        normalize,
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
  flushEffects()
  expect(children).toHaveBeenCalledTimes(2)
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
  flushEffects()
  await wait()
  children.mockClear()
  client.request.mockClear()
  rerender()
  flushEffects()
  await wait()
  expect(client.request).toHaveBeenCalledTimes(0)
  expect(children).toHaveBeenCalledTimes(1) // does still re-render children.
})

test('makes request if rerendered with new variables', async () => {
  const {client, query, rerender} = renderQuery({
    variables: {username: 'fred'},
  })
  flushEffects()
  await wait()
  client.request.mockClear()
  const newVariables = {username: 'george'}
  rerender({variables: newVariables})
  flushEffects()
  await wait()
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(query, newVariables)
})

test('makes request if rerendered with new query', async () => {
  const {client, variables, rerender} = renderQuery({
    query: `query neat() {}`,
  })
  flushEffects()
  await wait()
  client.request.mockClear()
  const newQuery = `query nice() {}`
  rerender({query: newQuery})
  flushEffects()
  await wait()
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(newQuery, variables)
})

test('normalize allows modifying data', async () => {
  const normalize = data => ({normalizedData: data})
  const {children} = renderQuery({normalize})
  flushEffects()
  await wait()
  expect(children).toHaveBeenCalledWith({
    data: {normalizedData: fakeResponse},
    error: null,
    fetching: false,
    loaded: true,
  })
})
