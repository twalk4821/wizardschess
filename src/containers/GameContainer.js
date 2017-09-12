import React, { Component } from 'react';
import Board from '../components/Board.js'
import Hud from '../components/Hud.js'

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
				<Board ref ="board" nextTurn = {this.nextTurn} turn = {this.state.turn} playerNames={this.props.playerNames}/>
			</div>
		)
	}
}

export default GameContainer;