import PropTypes from 'prop-types'
import React from 'react'
import {Section} from '../../../../shared/pattern'

export default RepoFilter

function RepoFilter({filter, onUpdate}) {
  return (
    <Section>
      <input
        type="text"
        value={filter}
        className="form-control"
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
