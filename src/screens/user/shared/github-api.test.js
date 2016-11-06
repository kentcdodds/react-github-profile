import axiosMock from 'axios'
import {getRepos, getUserData, BASE_URL} from './github-api'

test('getRepos makes a get request to the github repos API and resolves to the response.data', async () => {
  const username = 'chuck_norris'
  const data = {foo: 'bar'}
  axiosMock.handlers.get = url => {
    expect(url).toMatchSnapshot()
    return Promise.resolve({data})
  }
  const responseData = await getRepos(username)
  expect(responseData).toEqual(data)
})

test('getUserData makes two get requests and resolves them to an object', async () => {
  const username = 'chuck_norris'
  const userData = {name: 'Chuck Norris'}
  const orgsData = [{name: 'Cool 😎'}]
  const getHandler = jest.fn(url => {
    if (url === `${BASE_URL}/users/${username}`) {
      return Promise.resolve({data: userData})
    } else if (url === `${BASE_URL}/users/${username}/orgs`) {
      return Promise.resolve({data: orgsData})
    } else {
      return Promise.reject(new Error(`we should not be making a request to ${url}`))
    }
  })
  axiosMock.handlers.get = getHandler
  const {user, orgs} = await getUserData(username)
  expect(user).toEqual(userData)
  expect(orgs).toEqual(orgsData)
})
