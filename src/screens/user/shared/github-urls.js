/* eslint func-style:0 */
const BASE_URL = 'https://api.github.com'
const getUserUrl = username => `${BASE_URL}/users/${username}`
const getOrgUrl = username => `${BASE_URL}/users/${username}/orgs`
const getRepoUrl = username => `${BASE_URL}/users/${username}/repos?per_page=100&sort=pushed`

export {BASE_URL, getUserUrl, getOrgUrl, getRepoUrl}
