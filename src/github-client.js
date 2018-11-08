import {GraphQLClient} from 'graphql-request'

const headers = {}
if (process.env.REACT_APP_GITHUB_TOKEN) {
  headers.Authorization = `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
}

const client = new GraphQLClient('https://api.github.com/graphql', {headers})

export default client
