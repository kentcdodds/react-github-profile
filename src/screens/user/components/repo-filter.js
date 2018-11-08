import PropTypes from 'prop-types'
import React from 'react'
import {Section, Input} from '../../../shared/pattern'

export default RepoFilter

function RepoFilter({filter, onUpdate}) {
  return (
    <Section>
      <Input
        type="text"
        aria-label="Filter repositories"
        value={filter}
        placeholder="Filter repositories..."
        onChange={({target: {value}}) => onUpdate(value)}
      />
    </Section>
  )
}

RepoFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
