import React from 'react'
import {mount} from 'enzyme'
import ThemeProvider from '../../../../../shared/theme-provider'
import RepoFilter from '../'

test('when the user changes the input, the onUpdate prop is called with the new text', () => {
  const onUpdate = jest.fn()
  const wrapper = mount(
    <ThemeProvider>
      <RepoFilter filter={''} onUpdate={onUpdate} />
    </ThemeProvider>,
  )
  const value = 'a'
  wrapper.find('input').simulate('change', {target: {value}})
  expect(onUpdate).toHaveBeenCalledTimes(1)
  expect(onUpdate).toHaveBeenCalledWith(value)
})
