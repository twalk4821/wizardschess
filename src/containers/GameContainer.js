import React, { Component } from 'react';
import Board from '../components/Board.js'

import PropTypes from 'prop-types'

class GameContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			turn: "white"
		}
		this.nextTurn = this.nextTurn.bind(this)
	}

	nextTurn() {
		this.setState({
			turn: this.state.turn === "white" ? "black" : "white"
		})
	}

	render() {
		const playerName = this.state.turn === "white" ? this.props.playerNames.white : this.props.playerNames.black
		return (
			<div className="gameContainer">

				<h2>{playerName + "'s turn."}</h2>
				<Board 
				ref ="board" 
				nextTurn = {this.nextTurn} 
				turn = {this.state.turn}
				gameMode = {this.props.gameMode}
				playerNames={this.props.playerNames}/>
			</div>
		)
	}
}

GameContainer.propTypes = {
	playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
	gameMode: PropTypes.oneOf(["single", "local", "multi"])
}

export default GameContainer;