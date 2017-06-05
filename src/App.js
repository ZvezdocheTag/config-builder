import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from './components/Footer'
import Header from './components/Header'
import Content from './components/Content'
import * as TodoActions from './actions'
import './App.css'

const App = ({generator, actions}) => {
  
  return (
        <div className="App" >
        {/*<div className="App-header" >
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <Header></Header>
        <Content generator={ generator } actions={ actions }/>
         
      </div>
)
}
{/*<Footer  generator={ generator } actions={ actions }/>*/}
const mapStateToProps = state => ({
  generator: state.generator
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
