import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from './components/Footer'
import * as TodoActions from './actions'
import './App.css'

/*class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/
const App = ({generator, actions}) => {

  return (
        <div className="App" >
        <div className="App-header" >
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Footer  generator={ generator } actions={ actions }/>
      </div>
)
}

const mapStateToProps = state => ({
  todos: state.generator
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
