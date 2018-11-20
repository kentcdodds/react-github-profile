import React from 'react'

const sizes = {
  small: {zoom: 0.7},
  medium: {zoom: 1},
  large: {zoom: 2},
}

function Loading({size = 'medium', className = '', ...props}) {
  return (
    <div style={sizes[size]} className={`${className} lds-ellipsis`} {...props}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Loading
