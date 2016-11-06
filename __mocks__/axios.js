const axios = require.requireActual('axios')
const handlers = {}

module.exports = {
  handlers,
  get: jest.fn((...args) => {
    if (handlers.get) {
      return handlers.get(...args)
    }
    return Promise.resolve({response: {}})
  }),
  all: axios.all,
}
