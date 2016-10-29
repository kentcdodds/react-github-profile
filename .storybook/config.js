import {configure} from '@kadira/storybook'

function loadStories() {
  require('../src/app/index.example')
}

configure(loadStories, module)
