
import './app.scss'
import React from 'react'
import ScreenCompletion from '../screen-completion/screen-completion'
import ScreenOrder from '../screen-order/screen-order'
import ScreenPreview from '../screen-preview/screen-preview'
import { connect } from 'react-redux'

function App(props) {
  return (
    <div className="app">
      {props.workflowStep === 'order' ? <ScreenOrder /> : null}
      {props.workflowStep === 'preview' ? <ScreenPreview /> : null}
      {props.workflowStep === 'completion' ? <ScreenCompletion /> : null}
    </div>
  )
}

const mapStateToProps = state => ({ workflowStep: state.order.workflowStep })
export default connect(mapStateToProps)(App)
