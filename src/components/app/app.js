
import './app.scss'
import React from 'react'
import ScreenOrder from '../screen-order/screen-order'
import ScreenPreview from '../screen-preview/screen-preview'
import { connect } from 'react-redux'

function App(props) {
  return (
    <div className="app">
      {!props.order.preview
        ? <ScreenOrder />
        : <ScreenPreview />}
    </div>
  )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(App)
