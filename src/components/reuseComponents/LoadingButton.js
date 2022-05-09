import React from 'react'

function LoadingButton(props) {
  return (



    <div className="mt-3">
    <i className="btn btn-primary" type="button" disabled>
      <span
        className="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="sr-only">{props.value}</span>
    </i>
  </div>
  )
}

export default LoadingButton