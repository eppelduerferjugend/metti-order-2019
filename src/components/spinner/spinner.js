
import './spinner.scss'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ReactComponent as MinusIcon } from '../../icons/minus.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';

class Spinner extends Component {

  static defaultProps = {
    value: 0
  }

  render() {
    const className = 'spinner' +
      (this.props.value === 0 ? ' spinner--empty' : '')
    return (
      <div className={className}>
        <button
          className="spinner__decrement"
          onClick={this.decrementValue}>
          <MinusIcon />
        </button>
        <div className="spinner__indicator">{this.props.value}</div>
        <button
          className="spinner__increment"
          onClick={this.incrementValue}>
          <PlusIcon />
        </button>
      </div>
    )
  }

  decrementValue = (evt) => {
    evt.preventDefault()
    const previousValue = this.props.value
    this.props.onChange(Math.max(previousValue - 1, 0))
  }

  incrementValue = (evt) => {
    evt.preventDefault()
    const previousValue = this.props.value
    this.props.onChange(Math.max(previousValue + 1, 0))
  }
}

Spinner.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Spinner
