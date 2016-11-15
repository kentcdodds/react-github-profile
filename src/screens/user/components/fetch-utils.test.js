import * as utils from './fetch-utils'

test('arrayify leaves an array alone', () => {
  expect(utils.arrayify([1, 2])).toEqual([1, 2])
})

test('arrayify turns a non-array into an array', () => {
  expect(utils.arrayify({blah: 'bar'})).toEqual([{blah: 'bar'}])
})

test('getData gets the data property off of the first response when there is only one', () => {
  const data = {my: 'data'}
  const result = utils.getData([{data}])
  expect(result).toEqual(data)
})

test('getData maps the responses to their data property when there are more than one', () => {
  const data1 = {my: 'data'}
  const data2 = {myOther: 'data'}
  const result = utils.getData([{data: data1}, {data: data2}])
  expect(result).toEqual([data1, data2])
})

test('getError gets the response data and the configs method and url', () => {
  const url = 'https://example.com/put'
  const method = 'put'
  const data = {some: 'data'}
  const response = {data}
  const config = {method, url}
  const result = utils.getError({response, config})
  expect(result).toEqual({data, url, method})
})

test('urlsAreEqual should be equal if they are both the same string', () => {
  const url1 = 'https://example.com/url'
  const url2 = 'https://example.com/url'
  expect(utils.urlsAreEqual(url1, url2)).toBe(true)
})

test('urlsAreEqual should be equal if they are both arrays with the each item equal', () => {
  const url1 = ['https://example.com/url/1', 'https://example.com/url/2']
  const url2 = ['https://example.com/url/1', 'https://example.com/url/2']
  expect(utils.urlsAreEqual(url1, url2)).toBe(true)
})

test('urlsAreEqual should not be equal if one is an array and the other is not', () => {
  const url1 = 'https://example.com/url/1'
  const url2 = ['https://example.com/url/1', 'https://example.com/url/2']
  expect(utils.urlsAreEqual(url1, url2)).toBe(false)
})

test('urlsAreEqual should not be equal if they are different strings', () => {
  const url1 = 'https://example.com/url/1'
  const url2 = 'https://example.com/url/2'
  expect(utils.urlsAreEqual(url1, url2)).toBe(false)
})

test('urlsAreEqual should be equal if they are both arrays with a different item', () => {
  const url1 = ['https://example.com/url/1', 'https://example.com/url/2']
  const url2 = ['https://example.com/url/1', 'https://example.com/url/3']
  expect(utils.urlsAreEqual(url1, url2)).toBe(false)
})
