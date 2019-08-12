
import './segmented-control.scss'
import React from 'react'

function SegmentedControl(props) {
  return (
    <div className="segmented-control">
      {props.segments.map(segment => {
        const isActive = segment.value === props.value
        const className = 'segmented-control__segment' +
          (isActive ? ' segmented-control__segment--selected' : '')
        return (
          <button
            className={className}
            onClick={evt => {
              evt.preventDefault()
              props.onChange(segment.value)
            }}
            key={segment.value}>
            {segment.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedControl
