/* eslint global-require:0 */
import 'bootstrap/dist/css/bootstrap.css'
import {configure} from '@kadira/storybook'

function loadStories() {
  require('../src/screens/user/index.example')
  require('../src/screens/user/components/repo-list.example')
  require('../src/screens/user/components/profile.example')
}

document.body.addEventListener('keydown', event => {
  // there's a keyboard shortcut that's making it impossible to select text in inputs.
  if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && event.shiftKey && event.metaKey && event.target.tagName === 'INPUT') {
    event.stopPropagation()
  }
})

configure(loadStories, module)
