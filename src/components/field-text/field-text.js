
import './field-text.scss'
import React from 'react'

function FieldText(props) {
  return (
    <div className="field-text">
      <input
        className="field-text__input"
        type="text"
        value={props.value}
        onChange={evt => props.onChange(evt.target.value)}
        placeholder={props.placeholder || ''} />
    </div>
  )
}

export default FieldText
