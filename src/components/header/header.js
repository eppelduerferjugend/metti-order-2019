
import './header.scss'
import React from 'react'

function Header(props) {
  return (
    <header className="header">
      <div className="header__item">
        {props.onBackClick ? (
          <button
            className="header__button"
            onClick={props.onBackClick}
            disabled={props.backEnabled === false}>
            {props.backLabel || 'Zeréck'}
          </button>
        ) : null}
      </div>
      <div className="header__item">
        <h2 className="header__title">{props.title}</h2>
      </div>
      <div className="header__item">
        {props.onDoneClick ? (
          <button
            className="header__button"
            onClick={props.onDoneClick}
            disabled={props.doneEnabled === false}>
            {props.doneLabel || 'Fäerdeg'}
          </button>
        ) : null}
      </div>
    </header>
  )
}

export default Header
