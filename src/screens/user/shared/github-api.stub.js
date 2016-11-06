/* eslint camelcase:0 */
export {getMockRepos, getMockUser, getMockOrgs}

function getMockRepos() {
  return [
    {
      id: 43512914,
      name: 'cross-env',
      html_url: 'https://github.com/kentcdodds/cross-env',
      description: 'Cross platform setting of environment scripts',
      pushed_at: '2016-10-15T07:29:36Z',
      stargazers_count: 623,
      language: 'JavaScript',
      forks_count: 20,
    },
    {
      id: 52710065,
      name: 'all-contributors',
      html_url: 'https://github.com/kentcdodds/all-contributors',
      description: '✨ Recognize all contributors, not just the ones who push code ✨',
      pushed_at: '2016-03-30T03:35:22Z',
      stargazers_count: 171,
      language: null,
      forks_count: 14,
    },
    {
      id: 57072970,
      name: 'p-s',
      html_url: 'https://github.com/kentcdodds/p-s',
      description: 'All the benefits of npm scripts without the cost of a bloated package.json and limits of json',
      pushed_at: '2016-11-04T21:44:10Z',
      stargazers_count: 200,
      language: 'JavaScript',
      forks_count: 17,
    },
    {
      id: 66523440,
      name: 'match-sorter',
      html_url: 'https://github.com/kentcdodds/match-sorter',
      description: 'Simple, expected, and deterministic best-match sorting of an array in JavaScript',
      pushed_at: '2016-11-03T17:44:27Z',
      stargazers_count: 227,
      language: 'JavaScript',
      forks_count: 8,
    },
    {
      id: 38583384,
      name: 'ama',
      html_url: 'https://github.com/kentcdodds/ama',
      description: 'Ask me anything!',
      pushed_at: '2015-07-23T22:02:43Z',
      stargazers_count: 103,
      language: null,
      forks_count: 13,
    },
    {
      id: 63635802,
      name: 'webpack-config-utils',
      html_url: 'https://github.com/kentcdodds/webpack-config-utils',
      description: 'Utilities to help your webpack config be easier to read',
      pushed_at: '2016-08-30T05:40:32Z',
      stargazers_count: 81,
      language: 'JavaScript',
      forks_count: 4,
    },
  ]
}

function getMockUser() {
  return {
    login: 'kentcdodds',
    id: 1500684,
    avatar_url: 'https://avatars.githubusercontent.com/u/1500684?v=3',
    name: 'Kent C. Dodds',
    public_repos: 292,
    followers: 1432,
    following: 34,
  }
}

function getMockOrgs() {
  return [
    {
      login: 'angular',
      id: 139426,
      avatar_url: 'https://avatars.githubusercontent.com/u/139426?v=3',
    },
    {
      login: 'firebase',
      id: 1335026,
      avatar_url: 'https://avatars.githubusercontent.com/u/1335026?v=3',
    },
    {
      login: 'webpack',
      id: 2105791,
      avatar_url: 'https://avatars.githubusercontent.com/u/2105791?v=3',
    },
    {
      login: 'expressjs',
      id: 5658226,
      avatar_url: 'https://avatars.githubusercontent.com/u/5658226?v=3',
    },
    {
      login: 'gonimbly',
      id: 5798976,
      avatar_url: 'https://avatars.githubusercontent.com/u/5798976?v=3',
    },
    {
      login: 'gdgutah',
      id: 6627683,
      avatar_url: 'https://avatars.githubusercontent.com/u/6627683?v=3',
    },
    {
      login: 'github-beta',
      id: 7704921,
      avatar_url: 'https://avatars.githubusercontent.com/u/7704921?v=3',
    },
    {
      login: 'airpair',
      id: 8039323,
      avatar_url: 'https://avatars.githubusercontent.com/u/8039323?v=3',
    },
    {
      login: 'SLC-JS-Learners',
      id: 8120632,
      avatar_url: 'https://avatars.githubusercontent.com/u/8120632?v=3',
    },
    {
      login: 'formly-js',
      id: 8561755,
      avatar_url: 'https://avatars.githubusercontent.com/u/8561755?v=3',
    },
    {
      login: 'AngularAir',
      id: 9486604,
      avatar_url: 'https://avatars.githubusercontent.com/u/9486604?v=3',
    },
    {
      login: 'ReactWeek',
      id: 11040183,
      avatar_url: 'https://avatars.githubusercontent.com/u/11040183?v=3',
    },
    {
      login: 'forms-js',
      id: 11279140,
      avatar_url: 'https://avatars.githubusercontent.com/u/11279140?v=3',
    },
    {
      login: 'AngularClass',
      id: 11602678,
      avatar_url: 'https://avatars.githubusercontent.com/u/11602678?v=3',
    },
    {
      login: 'commitizen',
      id: 11980392,
      avatar_url: 'https://avatars.githubusercontent.com/u/11980392?v=3',
    },
    {
      login: 'eggheadio-github',
      id: 15644605,
      avatar_url: 'https://avatars.githubusercontent.com/u/15644605?v=3',
    },
    {
      login: 'javascriptair',
      id: 15834066,
      avatar_url: 'https://avatars.githubusercontent.com/u/15834066?v=3',
    },
    {
      login: 'facebookincubator',
      id: 19538647,
      avatar_url: 'https://avatars.githubusercontent.com/u/19538647?v=3',
    },
  ]
}
