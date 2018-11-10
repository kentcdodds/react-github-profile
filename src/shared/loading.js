import React from 'react'

function Loading({className = '', ...props}) {
  return (
    <>
      <div className={`${className} lds-ellipsis`} {...props}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </>
  )
}

export {Loading}
