import React from 'react'
import {mount} from 'enzyme'
import RepoFilter from './repo-filter'

test('when the user changes the input, the onUpdate prop is called with the new text', () => {
  const onUpdate = jest.fn()
  const wrapper = mount(<RepoFilter filter={''} onUpdate={onUpdate} />)
  const value = 'a'
  wrapper.find('input').simulate('change', {target: {value}})
  expect(onUpdate).toHaveBeenCalledTimes(1)
  expect(onUpdate).toHaveBeenCalledWith(value)
})
