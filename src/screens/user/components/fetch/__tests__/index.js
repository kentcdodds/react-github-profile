import React from 'react'
import {render, wait} from 'react-testing-library'
import Fetch from '../'

beforeEach(() => {
  jest.spyOn(window, 'fetch')
  window.fetch.mockImplementation(getUrl =>
    Promise.resolve({json: () => Promise.resolve({getUrl})}),
  )
})

afterEach(() => {
  window.fetch.mockRestore()
})

function renderFetch(props, options) {
  const children = jest.fn(() => null)
  const combinedProps = {url: 'http://example.com', children, ...props}
  const utils = render(<Fetch {...combinedProps} />, options)
  const rerender = newProps =>
    renderFetch({...combinedProps, ...newProps}, {container: utils.container})
  return {
    ...utils,
    rerender,
    ...combinedProps,
  }
}

test('renders a call to the given child function', () => {
  const children = jest.fn(() => <span>hey</span>)
  const {container} = renderFetch({children})

  expect(container.innerHTML).toBe('<span>hey</span>')
  expect(children).toHaveBeenCalledTimes(1)
  expect(children).toHaveBeenCalledWith({
    data: null,
    error: null,
    loading: true,
  })
})

test('makes a get request to the given URL and calls the children function with the resulting data for rendering', async () => {
  const url = 'https://example.com/han_solo'
  const {children} = renderFetch({url})
  await wait()

  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith(url)
  expect(children).toHaveBeenLastCalledWith({
    data: {getUrl: url},
    error: null,
    loading: false,
  })
})

test('can handle an array of URLs which will call children with an array of data in the same position', async () => {
  const url = [
    'https://example.com/han_solo',
    'https://example.com/leia_skywalker',
    'https://example.com/ben_solo',
  ]
  const {children} = renderFetch({url})
  await wait()

  expect(window.fetch).toHaveBeenCalledTimes(url.length)
  url.forEach(u => expect(window.fetch).toHaveBeenCalledWith(u))
  expect(children).toHaveBeenLastCalledWith({
    data: url.map(u => ({getUrl: u})),
    error: null,
    loading: false,
  })
})

test('does not make a new fetch if props change but the url is the same', async () => {
  const otherProp = 'thing1'
  const url = 'https://example.com/han_solo'
  const {children, rerender} = renderFetch({url, otherProp})
  await wait()

  children.mockClear()
  window.fetch.mockClear()

  rerender({otherProp: 'thing2'})
  await wait()

  expect(window.fetch).toHaveBeenCalledTimes(0)
  expect(children).toHaveBeenCalledTimes(1)
  expect(children).toHaveBeenCalledWith({
    data: {getUrl: url},
    error: null,
    loading: false,
  })
})

test('makes a new call if the url changes', async () => {
  const url1 = 'https://example.com/han_solo'
  const {children, rerender} = renderFetch({url: url1})
  await wait()

  children.mockClear()
  window.fetch.mockClear()

  const url2 = 'https://example.com/leia_skywalker'
  rerender({url: url2})
  await wait()

  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith(url2)
  expect(children).toHaveBeenLastCalledWith({
    data: {getUrl: url2},
    error: null,
    loading: false,
  })
})

test('calls the children with the error if there is an error for a request', async () => {
  const fakeError = {error: {fakeError: 'blah'}}
  window.fetch.mockImplementationOnce(getUrl => Promise.reject(fakeError))
  const {children, url} = renderFetch()
  await wait()

  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith(url)
  expect(children).toHaveBeenLastCalledWith({
    data: null,
    error: fakeError,
    loading: false,
  })
})

test('does not call setState when unmounted before requests finish', async () => {
  /* eslint no-console:0 */
  const originalError = console.error
  console.error = jest.fn()
  const {unmount} = renderFetch()
  unmount() // unmount immediately (before the things get a chance to resolve)

  await wait()

  // this try/catch is just to have an friendlier error message
  try {
    // if this test fails, console.error will be called with a forceUpdate error
    expect(console.error).toHaveBeenCalledTimes(0)
  } catch (e) {
    throw new Error(
      `console.error should not have been called but was called with: ${
        console.error.mock.calls
      }`,
    )
  } finally {
    console.error = originalError
  }
})
