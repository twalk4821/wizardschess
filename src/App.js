import React, { Component } from 'react';
import Routes from './Routes.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerNames: {
        white: "",
        black: ""
      }
    }
    this.updatePlayerNames = this.updatePlayerNames.bind(this)
  }

  updatePlayerNames(names) {
      this.setState({
        playerNames: names
      })
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="App">
        <Routes updatePlayerNames={this.updatePlayerNames} playerNames={this.state.playerNames}/>
      </div>
    );
  }
}

export default App;
