import React, {PropTypes} from 'react'

export default RepoFilter

function RepoFilter({filter, onUpdate}) {
  return (
    <section>
      <input
        type="text"
        value={filter}
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
