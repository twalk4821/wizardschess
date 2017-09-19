import React, { Component } from 'react';
import './Board.css'

import PropTypes from 'prop-types'

import Square from './Square.js'
import Algebra from './Algebra.js'
import Hud from '../components/Hud.js'

import chessBoard from '../classes/board.js'
import ai from '../classes/ai.js'

class Board extends Component {
	constructor(props) {
		super(props)

		const board = new chessBoard()
		board.init()
		this.state = {
			board: board,
			activeSquare: null,
			activeMoveset: null,
			turnCount: 1,
			lastMove: null
		}

		this.toggleActive = this.toggleActive.bind(this)
		this.setActiveSquare = this.setActiveSquare.bind(this)
		this.executeCommand = this.executeCommand.bind(this)
	}

	componentDidMount() {
		this.state.board.updateAvailableMoves("white")
	}

	componentDidUpdate(prevProps) {
		if (this.state.board.isCheck(this.props.turn)) {
			this.state.board.isCheckmate(this.props.turn) ?
				this.message.textContent = "Checkmate!!!" :
				this.message.textContent = "Check.";
		}

		this.state.board.updateAvailableMoves(this.props.turn)

		if (this.props.turn === "black" && 
			prevProps.turn === "white" &&
			this.props.gameMode === "single") {
			setTimeout(function() {
				let aiMove = ai.getBestMove(this.state.board, 2);
				this.move(aiMove.piece, aiMove.destination);	
			}.bind(this), 1500)			
		}	
	}

	toggleActive(square) {
		let activeSquare = this.state.activeSquare

		if (!activeSquare) {
			if (!square.props.piece) return;
			if (!(square.props.piece.color === this.props.turn)) return;
			this.setActiveSquare(square)
		} else {
			if (square.isEqualTo(activeSquare)) {
				this.setActiveSquare(null)
			} else {
				if (!square.props.piece || square.props.piece.color !== activeSquare.props.piece.color) {
					this.move(activeSquare.props.piece, square.props.pos)
				} else if (square.props.piece.color === activeSquare.props.piece.color) {
					this.setActiveSquare(square)
				}
			}
		}
	}
		
	setActiveSquare(square) {
		this.setState({
			activeSquare: square,
			activeMoveset: square ? square.props.piece.calculateMoveset(this.state.board) : []
		})

	}

	executeCommand(command) {
		command = command.split(" ");

		const piece = command[0];
		const pieceType = piece.charAt(0).toLowerCase() + piece.slice(1)

		const livePiecesForCurrentPlayer = this.state.board.livePieces[this.props.turn];

		const location = command[2].split("");
		const destination = {
			x: location[0].charCodeAt(0) - 65,
			y: parseInt(location[1], 10)-1
		};

		const validTargets = []
		for (let livePiece of livePiecesForCurrentPlayer[pieceType]) {
			const moveset = livePiece.availableMoves
			if (this.state.board.destinationInMoveset(destination, moveset) &&
				!this.state.board.movingIntoCheck(livePiece, destination, this.props.turn)) {
				validTargets.push(livePiece)
			}
		}

		if (validTargets.length === 1) {
			return this.move(validTargets[0], destination)
		} else if (validTargets.length === 0) {
			this.message.textContent = "That command is not associated with any available moves.";
			return false
		} else {
			this.message.textContent = "That command is associated with multiple targets. Please move manually for now.";
			return false
		}
	}

	move(piece, destination) {
		const moveset = piece.availableMoves
		if (this.state.board.destinationInMoveset(destination, moveset)) {

			if (this.state.board.movingIntoCheck(piece, destination, this.props.turn)) {
				this.message.textContent = "Can't move into check";
				return false
			}

			this.state.board.move(piece, destination) 

			if (this.props.turn === "black") {
				this.incrementTurnCount()
			}

			piece.hasMoved = true;

			this.setActiveSquare(null)
			this.message.textContent = ""
			this.setState({
				lastMove: [piece, destination]
			})
			this.props.nextTurn()
			return true	
		}
		else {
			this.message.textContent = "Not a valid move.";
			this.setActiveSquare(null)
			return false
		}


	}



	incrementTurnCount() {
		this.setState({
			turnCount: this.state.turnCount + 1
		})
	}




	render() {
		var Squares = [];
		for (var i = 7; i>=-1; i--) {
			for (var j = -1; j < 8; j++) {
				if (i === -1 || j === -1) {
					const square = <Algebra pos= {{x:j, y:i}} key={j + "," + i}/>
					Squares.push(square)
				} else {
					const square = <Square piece={this.state.board.getPieceAtLocation(j, i)} toggle={this.toggleActive} pos={{x:j, y:i}} activeSquare={this.state.activeSquare} key={j + "," + i} />
					Squares.push(square);
				}
				
			}
		}
		return (
			<div>
			<h2 ref={message=> {this.message = message }} className="message"> </h2>
			<div className="playArea">
				<div className="board">
					{Squares}
				</div>
				<Hud 
				executeCommand={this.executeCommand} 
				turn={this.props.turn} 
				turnCount={this.state.turnCount} 
				capturedPieces={this.state.board.capturedPieces} 
				playerNames={this.props.playerNames}
				gameMode={this.props.gameMode}
				lastMove={this.state.lastMove}
				/>
			</div>
			</div>

			
		)
	}
}

Board.propTypes = {
	playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
	gameMode: PropTypes.oneOf(['single', 'local', 'multi']).isRequired,
	turn: PropTypes.oneOf(['white', 'black']).isRequired,
	nextTurn: PropTypes.func
}

export default Board