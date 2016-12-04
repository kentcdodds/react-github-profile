import React, {PropTypes} from 'react'
import {merge} from 'glamor'
import {borderBottom, sectionPadding} from '../styles'

export default RepoFilter

function RepoFilter({filter, onUpdate}) {
  return (
    <section {...merge(borderBottom, sectionPadding)}>
      <input
        type="text"
        value={filter}
        className="form-control"
        placeholder="Filter repositories..."
        onChange={({target: {value}}) => onUpdate(value)}
      />
    </section>
  )
}

RepoFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
