
import '../screen/screen.scss'
import './screen-completion.scss'
import * as actions from '../../actions'
import Button from '../button/button'
import Header from '../header/header'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReactComponent as CheckIcon } from '../../icons/check-circle.svg'
import { ReactComponent as ErrorIcon } from '../../icons/error-circle.svg'
import { ReactComponent as SpinnerIcon } from '../../icons/spinner.svg'

class ScreenCompletion extends Component {
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

  /**
   * Places order at the backend service and tracks its state.
   * @return {void}
   */
  async placeOrder () {
    // Set loading (before first rendering)
    this.props.setOrderLoading(true, null)

    // Create an order request for each destination
    const request = this.getDestinations().map(destination => ({
      destination,
      waiter: this.props.order.waiter,
      table: this.props.order.table,
      comment: this.props.order.destinationComments[destination] || null,
      items: this.getOrderItems()
        .filter(item => item.destination.name === destination)
        .map(item => ({
          id: item.id,
          quantity: this.props.order.itemQuantities[item.id]
        }))
    }))

    // Try to submit order
    let response = null
    try {
      const { serviceEndpoint, serviceUsername, servicePassword } =
        this.props.config
      response = await fetch(`${serviceEndpoint}/order`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':
            `Basic ${btoa(`${serviceUsername}:${servicePassword}`)}`
        },
        body: JSON.stringify(request)
      })
    } catch (err) {
      // Networking error
      this.props.setOrderLoading(false, err)
      return
    }

    if (!response.ok) {
      // Request error
      this.props.setOrderLoading(false, response)
      return
    }

    // TODO: Show order numbers
    // const responseData = await response.json()
    this.props.setOrderLoading(false, null)
  }

  componentDidMount () {
    // Set loading (before first rendering)
    this.props.setOrderLoading(true, null)

    // Place order async
    this.placeOrder()
  }

  render () {
    let state = 'loading'
    if (!this.props.order.loading) {
      state = this.props.order.error ? 'error' : 'success'
    }

    return (
      <div className="screen screen-completion">
        <Header
          title="Metti"
          backEnabled={state === 'error'}
          onBackClick={() => this.props.setOrderWorkflowStep('preview')} />
        <div className="screen__content screen__content--centered">

          {state === 'loading' ? (
            <SpinnerIcon className={
              'screen-completion__icon ' +
              'screen-completion__icon--spinning'
            } />
          ) : null}

          {state === 'success' ? (
            <div className="screen-completion__alert">
              <CheckIcon className="screen-completion__icon" />
              <p className="screen-completion__message">
                Bestellung ass opginn.
              </p>
              <Button
                label="Fäerdeg"
                onClick={this.props.resetOrder} />
            </div>
          ) : null}

          {state === 'error' ? (
            <div className="screen-completion__alert">
              <ErrorIcon className="screen-completion__icon" />
              <p className="screen-completion__message">
                Et gouf e Problem beim Bestellen.
                Iwwerpréif deng Internetverbindung.
              </p>
              <Button
                label="Wiederhuelen"
                onClick={this.placeOrder.bind(this)} />
            </div>
          ) : null}

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ScreenCompletion)
