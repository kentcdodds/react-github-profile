import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import ThemeProvider from '../../../../shared/theme-provider'
import RepoFilter from '../repo-filter'

test('when the user changes the input, the onUpdate prop is called with the new text', () => {
  const onUpdate = jest.fn()
  const {getByLabelText} = render(
    <ThemeProvider>
      <RepoFilter filter="" onUpdate={onUpdate} />
    </ThemeProvider>,
  )
  const value = 'a'
  fireEvent.change(getByLabelText(/filter/i), {target: {value}})
  expect(onUpdate).toHaveBeenCalledTimes(1)
  expect(onUpdate).toHaveBeenCalledWith(value)
})
