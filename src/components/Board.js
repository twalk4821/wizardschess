import React, { Component } from 'react';
import './Board.css'

import Square from './Square.js'
import Algebra from './Algebra.js'
import Hud from '../components/Hud.js'

import chessBoard from '../classes/board.js'
import Piece from '../classes/pieces.js'

class Board extends Component {
	constructor(props) {
		super(props)

		const board = new chessBoard()
		board.init()
		this.state = {
			board: board,
			activeSquare: null,
			activeMoveset: null,
			turnCount: 1
		}

		this.toggleActive = this.toggleActive.bind(this)
		this.setActiveSquare = this.setActiveSquare.bind(this)
		this.isCheck = this.isCheck.bind(this)
		this.isCheckmate = this.isCheckmate.bind(this)
		this.executeCommand = this.executeCommand.bind(this)
	}

	componentDidMount() {
		this.updateAvailableMoves()
	}

	componentDidUpdate() {
		let simulatedBoard = this.state.board.copy()
		if (this.isCheck(simulatedBoard)) {
			this.isCheckmate() ?
				this.message.textContent = "Checkmate!!!" :
				this.message.textContent = "Check.";
		}
		this.updateAvailableMoves()	
	}

	updateAvailableMoves() {
		for (let pieceType in this.state.board.livePieces[this.props.turn]) {
			for (let livePiece of this.state.board.livePieces[this.props.turn][pieceType]) {
				livePiece.availableMoves = livePiece.calculateMoveset(this.state.board)
			}
		}
		console.log(this.state.board.livePieces)
	}

	isCheckmate() {
		let playerColor = this.props.turn;
		let livePieces = this.state.board.livePieces[playerColor];
		for (let type in livePieces) {
			let piecesOfType = livePieces[type]
			for (var i = 0; i<piecesOfType.length; i++) {
				let piece = piecesOfType[i];
				let moveset = piece.calculateMoveset(this.state.board)
				for (var j = 0; j<moveset.length; j++) {
					let destination = moveset[j]
					if (!this.movingIntoCheck(piece, destination)) {
						return false;
					}	
				}
			}
		}
		return true
	}



	isCheck(simulatedBoard) {
		const playerColor = this.props.turn
		const opponentColor = this.props.turn === "white" ? "black" : "white"
		const king = simulatedBoard.livePieces[playerColor].king[0]
		const kingsPosition = {
			x: king.pos[0],
			y: king.pos[1]
		}

		const opponentPieces = simulatedBoard.livePieces[opponentColor]
		for (let type in opponentPieces) {
			let piecesOfType = opponentPieces[type];
			for (var i = 0; i< piecesOfType.length; i++) {
				const piece = piecesOfType[i];
				const moveset = piece.calculateMoveset(simulatedBoard)
				if (this.destinationInMoveset(kingsPosition, moveset)) return true;
			}
		}
		return false;
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
			y: parseInt(location[1])-1
		}

		const validTargets = []
		for (let livePiece of livePiecesForCurrentPlayer[pieceType]) {
			const moveset = livePiece.availableMoves
			console.log(moveset)
			if (this.destinationInMoveset(destination, moveset) &&
				!this.movingIntoCheck(livePiece, destination)) {
				console.log("pushing valid target: ", livePiece)
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
		if (this.destinationInMoveset(destination, moveset)) {

			if (this.movingIntoCheck(piece, destination)) {
				this.message.textContent = "Can't move into check";
				return false
			}

			this.state.board.move(piece, destination) 

			if (this.props.turn === "black") {
				this.incrementTurnCount()
			}
			this.props.nextTurn()

			piece.hasMoved = true;

			this.setActiveSquare(null)
			this.message.textContent = ""
			return true	
		}
		else {
			this.message.textContent = "Not a valid move.";
			this.setActiveSquare(null)
			return false
		}


	}

	movingIntoCheck(piece, destination) {
		const simulatedBoard = this.state.board.copy()
		simulatedBoard.simulateMove(piece, destination)

		return this.isCheck(simulatedBoard) ? true : false
	}

	incrementTurnCount() {
		this.setState({
			turnCount: this.state.turnCount + 1
		})
	}

	destinationInMoveset(destination, moveset) {
		for (var i = 0; i<moveset.length; i++) {
			const move = moveset[i]
			if (destination.x === move.x && destination.y === move.y) return true
		}
		return false
	}


	render() {
		var Squares = [];
		for (var i = 7; i>=-1; i--) {
			for (var j = -1; j < 8; j++) {
				if (i === -1 || j === -1) {
					const square = <Algebra pos= {{x:j, y:i}} />
					Squares.push(square)
				} else {
					const square = <Square piece={this.state.board.getPieceAtLocation(j, i)} toggle={this.toggleActive} pos={{x:j, y:i}} activeSquare={this.state.activeSquare}/>
					Squares.push(square);
				}
				
			}
		}
		return (
			<div>
			<h2 ref={message=> {this.message = message }} className="message"></h2>
			<div className="playArea">
				<div className="board">
					{Squares}
				</div>
				<Hud executeCommand={this.executeCommand} turn={this.props.turn} turnCount={this.state.turnCount} capturedPieces={this.state.board.capturedPieces} playerNames={this.props.playerNames}/>
			</div>
			</div>

			
		)
	}
}

export default Board