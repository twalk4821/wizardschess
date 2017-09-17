import React, { Component } from 'react';
import GameContainer from './containers/GameContainer.js'
import HomeContainer from './containers/HomeContainer.js'
import Routes from './Routes.js'
import logo from './logo.svg';
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
    console.log(this.state)
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
