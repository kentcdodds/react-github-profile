import * as utils from '../utils'

test('arrayify leaves an array alone', () => {
  expect(utils.arrayify([1, 2])).toEqual([1, 2])
})

test('arrayify turns a non-array into an array', () => {
  expect(utils.arrayify({blah: 'bar'})).toEqual([{blah: 'bar'}])
})

test('unwrap returns the first item in the array if there is only one item in the array', () => {
  const data = {my: 'data'}
  const result = utils.unwrap([data])
  expect(result).toEqual(data)
})

test('unwrap returns the array if there are more than one item in the array', () => {
  const data1 = {my: 'data'}
  const data2 = {myOther: 'data'}
  const result = utils.unwrap([data1, data2])
  expect(result).toEqual([data1, data2])
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
