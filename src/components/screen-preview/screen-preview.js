
import '../screen/screen.scss'
import './screen-preview.scss'
import * as actions from '../../actions'
import FieldText from '../field-text/field-text'
import Header from '../header/header'
import ItemList from '../item-list/item-list'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ScreenPreview extends Component {

  render() {
    const items = this.props.items
      .filter(item => this.props.order.itemQuantities[item.id] !== undefined)

    const destinations = items
        .map(item => item.destination.name)
        .filter((item, index, array) => array.indexOf(item) === index)

    return (
      <div className="screen screen-preview">
        <Header
          title="Metti"
          onBackClick={() => this.props.setOrderPreview(false)} />
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
              value={this.props.order.table || ''}
              onChange={this.props.setOrderTable} />
          </div>
        </div>
        <div className="screen-preview__section" key="waiter">
          <h3 className="screen-preview__section-headline">Service</h3>
          <div className="screen-preview__field">
            <FieldText
              placeholder="Service"
              value={this.props.order.waiter || ''}
              onChange={this.props.setOrderWaiter} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ScreenPreview)
