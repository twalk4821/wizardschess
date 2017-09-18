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
      },
      gameMode: "single"
    }
    this.updatePlayerNames = this.updatePlayerNames.bind(this)
    this.updateGameMode = this.updateGameMode.bind(this)
  }

  updatePlayerNames(names) {
      this.setState({
        playerNames: names
      })
  }

  updateGameMode(mode) {
    this.setState({
      gameMode: mode
    })
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="App">
        <Routes 
        updatePlayerNames={this.updatePlayerNames} 
        updateGameMode={this.updateGameMode}
        playerNames={this.state.playerNames}
        gameMode={this.state.gameMode}
        />
      </div>
    );
  }
}

export default App;
