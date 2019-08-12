
import './item-list.scss'
import PropTypes from 'prop-types'
import React from 'react'
import Spinner from '../spinner/spinner'

function ItemList(props) {
  const sections =
    (props.itemSections || [''])
      .filter((section, index, array) => array.indexOf(section) === index)
  return (
    <ul className="item-list">
      {sections.map(section => (
        <li className="item-list__section" key={section}>
          {section
            ? <h3 className="item-list__section-header">{section}</h3>
            : null}
          <ul className="item-list__items">
            {props.items
              .filter((item, index) =>
                props.itemSections === undefined ||
                props.itemSections[index] === section)
              .map(item => (
              <li className="item-list__item" key={item.id}>
                <span className="item-list__item-label">{item.name}</span>
                <div className="item-list__spinner">
                  <Spinner
                    value={props.itemQuantities[props.items.indexOf(item)]}
                    onChange={props.onQuantityChange.bind(this, item.id)} />
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

ItemList.propTypes = {
  onQuantityChange: PropTypes.func.isRequired
}

export default ItemList
