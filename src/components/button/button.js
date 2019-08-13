
import './button.scss'
import React from 'react'

function Button(props) {
  return (
    <button
      className="button"
      disabled={props.enabled === false}
      onClick={props.onClick}>
      {props.label}
    </button>
  )
}

export default Button
