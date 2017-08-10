import React from 'react'
import {mount, render} from 'enzyme'
import axiosMock from 'axios'
import Fetch from '../'

beforeEach(() => {
  axiosMock.get.mockClear()
})

test('renders a call to the given child function', () => {
  const children = jest.fn(() => <span>hey</span>)
  const wrapper = render(<Fetch {...getProps({children})} />)

  expect(wrapper.html()).toBe('<span>hey</span>')
  expect(children).toHaveBeenCalledTimes(1)
  expect(children).toHaveBeenCalledWith({
    data: null,
    error: null,
    loading: true,
  })
})

test('makes a get request to the given URL and calls the children function with the resulting data for rendering', async () => {
  axiosMock.handlers.get = getUrl => Promise.resolve({data: {getUrl}})
  const url = 'https://example.com/han_solo'
  const children = jest.fn(() => <span />)
  mountComponent({url, children})
  await nextTick()

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(children).toHaveBeenLastCalledWith({
    data: {getUrl: url},
    error: null,
    loading: false,
  })
})

test('can handle an array of URLs which will call children with an array of data in the same position', async () => {
  axiosMock.handlers.get = getUrl => Promise.resolve({data: {getUrl}})
  const url = [
    'https://example.com/han_solo',
    'https://example.com/leia_skywalker',
    'https://example.com/ben_solo',
  ]
  const children = jest.fn(() => <span />)
  mountComponent({url, children})
  await nextTick()

  expect(axiosMock.get).toHaveBeenCalledTimes(url.length)
  url.forEach(u => expect(axiosMock.get).toHaveBeenCalledWith(u))
  expect(children).toHaveBeenLastCalledWith({
    data: url.map(u => ({getUrl: u})),
    error: null,
    loading: false,
  })
})

test('does not make a new fetch if props change but the url is the same', async () => {
  axiosMock.handlers.get = getUrl => Promise.resolve({data: {getUrl}})
  const otherProp = 'thing1'
  const url = 'https://example.com/han_solo'
  const children = jest.fn(() => <span />)
  const wrapper = mountComponent({url, otherProp, children})
  await nextTick()

  children.mockClear()
  axiosMock.get.mockClear()

  const otherProp2 = 'thing2'
  wrapper.setProps({otherProp: otherProp2})
  await nextTick()

  expect(axiosMock.get).toHaveBeenCalledTimes(0)
  expect(children).toHaveBeenCalledTimes(1)
  expect(children).toHaveBeenCalledWith({
    data: {getUrl: url},
    error: null,
    loading: false,
  })
})

test('makes a new call if the url changes', async () => {
  axiosMock.handlers.get = getUrl => Promise.resolve({data: {getUrl}})
  const url1 = 'https://example.com/han_solo'
  const children = jest.fn(() => <span />)
  const wrapper = mountComponent({url: url1, children})
  await nextTick()

  children.mockClear()
  axiosMock.get.mockClear()

  const url2 = 'https://example.com/leia_skywalker'
  wrapper.setProps({url: url2})
  await nextTick()

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url2)
  expect(children).toHaveBeenLastCalledWith({
    data: {getUrl: url2},
    error: null,
    loading: false,
  })
})

test('calls the children with the error if there is an error for a request', async () => {
  axiosMock.handlers.get = getUrl => {
    return Promise.reject({
      config: {method: 'get', url: getUrl},
      response: {
        data: {getUrl},
      },
    })
  }
  const url = 'https://example.com/han_solo'
  const children = jest.fn(() => <span />)
  mountComponent({url, children})
  await nextTick()

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(children).toHaveBeenLastCalledWith({
    data: null,
    error: {data: {getUrl: url}, method: 'get', url},
    loading: false,
  })
})

test('does not call setState when unmounted before requests finish', async () => {
  /* eslint no-console:0 */
  const originalError = console.error
  console.error = jest.fn()
  const wrapper = mountComponent()
  wrapper.unmount() // unmount immediately (before the things get a chance to resolve)

  await nextTick()

  // this try/catch is just to have an friendlier error message
  try {
    // if this test fails, console.error will be called with a forceUpdate error
    expect(console.error).toHaveBeenCalledTimes(0)
  } catch (e) {
    throw new Error(
      `console.error should not have been called but was called with: ${console
        .error.mock.calls}`,
    )
  } finally {
    console.error = originalError
  }
})

function nextTick(time = 0) {
  return new Promise(resolve => {
    setTimeout(() => resolve())
  }, time)
}

function mountComponent(props) {
  return mount(<Fetch {...getProps(props)} />)
}

function getProps(props) {
  return {
    url: 'http://example.com/',
    children() {
      return <span />
    },
    ...props,
  }
}
