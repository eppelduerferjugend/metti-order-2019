
import '../screen/screen.scss'
import './screen-preview.scss'
import * as actions from '../../actions'
import Button from '../button/button'
import FieldText from '../field-text/field-text'
import Header from '../header/header'
import ItemList from '../item-list/item-list'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ScreenPreview extends Component {
  /**
   * Returns item objects selected for the current order.
   * @return {object[]}
   */
  getOrderItems () {
    return this.props.items.filter(item =>
      // Filter items for which a quantity is defined
      this.props.order.itemQuantities[item.id] !== undefined)
  }

  /**
   * Returns destination name strings selected for the current order.
   * @return {string[]}
   */
  getDestinations () {
    return this.getOrderItems()
      // Map item objects to their respective destination name strings
      .map(item => item.destination.name)
      // Remove duplicate destination names
      .filter((item, index, array) => array.indexOf(item) === index)
  }

  render() {
    const items = this.getOrderItems()
    const destinations = this.getDestinations()

    // Verify order
    let submitEnabled = true
    let submitLabel = 'Bestellung opginn'

    if (this.props.order.table.length === 0) {
      submitEnabled = false
      submitLabel = 'Dësch fehlt'
    } else if (!this.props.order.table.match('^[A-Za-z][0-9]{1,2}$')) {
      submitEnabled = false
      submitLabel = 'Dësch falsch'
    } else if (this.props.order.waiter.length < 2) {
      submitEnabled = false
      submitLabel = 'Serveur/euse fehlt'
    } else if (items.length === 0) {
      submitEnabled = false
      submitLabel = 'Näischt ausgewielt'
    }

    return (
      <div className="screen screen-preview">
        <Header
          title="Metti"
          onBackClick={() => this.props.setOrderWorkflowStep('order')} />
        {destinations.map(destination => {
          const destinationItems = items.filter(
            item => item.destination.name === destination)
          const destinationItemQuantities = destinationItems.map(
            item => this.props.order.itemQuantities[item.id])
          return (
            <div className="screen-preview__section" key={destination}>
              <h3 className="screen-preview__section-headline">{destination}</h3>
              <ItemList
                items={destinationItems}
                itemQuantities={destinationItemQuantities}
                onQuantityChange={this.props.changeOrderItemQuantity} />
              <div className="screen-preview__field">
                <FieldText
                  placeholder={`${destination} Kommentar bäisetzen`}
                  value={this.props.order.destinationComments[destination] || ''}
                  onChange={value => this.props.setOrderDestinationComment(destination, value)} />
              </div>
            </div>
          )
        })}
        <div className="screen-preview__section" key="table">
          <h3 className="screen-preview__section-headline">Dësch</h3>
          <div className="screen-preview__field">
            <FieldText
              placeholder="Dësch"
              value={this.props.order.table}
              onChange={this.props.setOrderTable} />
          </div>
        </div>
        <div className="screen-preview__section" key="waiter">
          <h3 className="screen-preview__section-headline">Serveur/euse</h3>
          <div className="screen-preview__field">
            <FieldText
              placeholder="Serveur/euse"
              value={this.props.order.waiter}
              onChange={this.props.setOrderWaiter} />
          </div>
        </div>
        <div className="screen-preview__submit">
          <Button
            label={submitLabel}
            enabled={submitEnabled}
            onClick={() => this.props.setOrderWorkflowStep('completion')} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ScreenPreview)
