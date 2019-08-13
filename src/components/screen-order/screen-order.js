
import '../screen/screen.scss'
import './screen-order.scss'
import * as actions from '../../actions'
import Header from '../header/header'
import ItemList from '../item-list/item-list'
import React, { Component } from 'react'
import SegmentedControl from '../segmented-control/segmented-control'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ScreenOrder extends Component {

  async fetchItems () {
    const {
      serviceEndpoint,
      serviceUsername,
      servicePassword,
    } = this.props.config

    // Try to fetch items
    let response = null
    try {
      response = await fetch(`${serviceEndpoint}/item`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization':
            `Basic ${btoa(`${serviceUsername}:${servicePassword}`)}`
        }
      })
    } catch (err) {
      // Networking error
      alert(
        "D'Kaart konnt net geluede ginn. " +
        "W.e.g. Verbindung iwwerpréiwen a nei lueden.")
      return
    }

    if (!response.ok) {
      // Request error
      alert("Server net verfügbar. W.e.g. Verantwortleche kontaktéieren.")
      return
    }

    // Update each item received
    const newItems = await response.json()
    newItems.forEach(this.props.updateItem)

    // Set initial destination to the first item's destination
    if (this.props.items.length > 0 &&
        this.props.order.selectedDestination === null) {
      const firstDestination = this.props.items[0].destination.name
      this.props.selectOrderDestination(firstDestination)
    }
  }

  componentDidMount () {
    if (this.props.items.length === 0) {
      // Initial item fetch
      this.fetchItems()
    }
  }

  render () {
    const destinationNames =
      this.props.items
        .map(item => item.destination.name)
        .filter((item, index, array) => array.indexOf(item) === index)
        .map(name => ({ value: name, label: name }))

    const items = this.props.items
      .filter(item => item.destination.name === this.props.order.selectedDestination)

    return (
      <div className="screen screen-order">
        <Header
          title="Metti"
          doneLabel="Weider"
          doneEnabled={Object.keys(this.props.order.itemQuantities).length > 0}
          onDoneClick={() => this.props.setOrderWorkflowStep('preview')} />
        <div className="screen-order__destinations">
          <SegmentedControl
            segments={destinationNames}
            value={this.props.order.selectedDestination}
            onChange={this.props.selectOrderDestination} />
        </div>
        <ItemList
          items={items}
          itemSections={items.map(item =>
            item.category ? item.category.name : '')}
          itemQuantities={items.map(item =>
            this.props.order.itemQuantities[item.id] || 0)}
          onQuantityChange={this.props.changeOrderItemQuantity} />
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ScreenOrder)
