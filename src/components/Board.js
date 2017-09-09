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
			turnNumber: 1
		}

		this.toggleActive = this.toggleActive.bind(this)
		this.setActiveSquare = this.setActiveSquare.bind(this)
		this.isCheck = this.isCheck.bind(this)
		this.isCheckmate = this.isCheckmate.bind(this)
		this.executeCommand = this.executeCommand.bind(this)
	}

	componentDidUpdate() {
		let simulatedBoard = this.state.board.copy()
		if (this.isCheck(simulatedBoard)) {
			this.isCheckmate() ?
				this.message.textContent = "Checkmate!!!" :
				this.message.textContent = "Check.";
		}	
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
					let move = moveset[j]
					let simulatedBoard = this.state.board.copy()
					simulatedBoard.simulateMove(piece, move)
					if (!this.isCheck(simulatedBoard)) {
						return false
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
			square.toggleActive()
			this.setActiveSquare(square)
		} else {
			if (square.isEqualTo(activeSquare)) {
				square.toggleActive()
				this.setActiveSquare(null)
			} else {
				if (!square.props.piece || square.props.piece.color !== activeSquare.props.piece.color) {
					this.move(activeSquare.props.piece, square)
				} else if (square.props.piece.color === activeSquare.props.piece.color) {
					activeSquare.toggleActive()
					this.setActiveSquare(square)
					square.toggleActive()
				}
			}
		}
	}
		
	setActiveSquare(square) {
		this.setState({
			activeSquare: square
		})
	}

	executeCommand(command) {
		command = command.split(" ");
		const piece = command[0];
		const pieceType = piece.charAt(0).toLowerCase() + piece.slice(1)
		let playerColor = this.props.turn;
		let livePieces = this.state.board.livePieces[playerColor];
		const location = command[2].split("");
		let x = location[0].charCodeAt(0) - 65;
		let y = parseInt(location[1])-1
		for (let livePiece of livePieces[pieceType]) {
			const square = <Square piece={livePiece} toggle={this.toggleActive} pos={{x:x, y:y}}/>
			var val = this.move(livePiece, square)
			if (val) {
				return true
			}
		}
		console.log("invalid command")
		return false
	}

	move(piece, square) {
		if (this.state.activeSquare) {
			this.state.activeSquare.setState({
				active: null
			})
		}
		
		this.setState({
			activeSquare: null
		})
		const moveset = piece.calculateMoveset(this.state.board)
		const destination = square.props.pos
		const board = this.state.board
		if (this.destinationInMoveset(destination, moveset)) {
			//disallow moving into check
			let simulatedBoard = board.copy()
			simulatedBoard.simulateMove(piece, destination)
			if (this.isCheck(simulatedBoard)) {
				console.log("can't move into check")
				this.message.textContent = "Can't move into check";
				return false
			}

			board.move(piece, destination) 

			if (this.props.turn === "black") {
				this.setState({
					turnNumber: this.state.turnNumber + 1
				})
			}
			this.props.nextTurn()

			if (piece.type === "pawn") {
				piece.hasMoved = true
			}
			this.message.textContent = ""
			return true	
		}
		else {
			console.log("invalid move")
			this.message.textContent = "Not a valid move.";
			return false
		}

	}

	simulateMove(piece, x, y) {

	}

	destinationInMoveset(destination, moveset) {
		for (var i = 0; i<moveset.length; i++) {
			const move = moveset[i];
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
					const square = <Square piece={this.state.board.getPieceAtLocation(j, i)} toggle={this.toggleActive} pos={{x:j, y:i}}/>
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
				<Hud executeCommand={this.executeCommand} turn={this.props.turn} turnNumber={this.state.turnNumber} capturedPieces={this.state.board.capturedPieces} playerNames={this.props.playerNames}/>
			</div>
			</div>

			
		)
	}
}

export default Board