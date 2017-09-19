import React, { Component } from 'react';
import './Hud.css'

import PropTypes from 'prop-types'

class Hud extends Component {
	constructor(props) {
		super(props)
		this.state = {
			recording: false,
			message: 'To enter a voice command, press the button to the right and speak a command such as: "Knight to C3."'
		}
		
		this.startRecording = this.startRecording.bind(this)
	}

	componentDidMount() {
		const pieces = ['Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King']
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
		const commands = []
		for (let piece of pieces) {
			for (let letter of letters) {
				for (var i = 1; i<9; i++) {
					const command = piece + ' to ' + letter + i
					commands.push(command)
				}
			}
		}
		this.commands = commands
		const grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
		this.recognition = new SpeechRecognition();
		const speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString(grammar, 1);
		this.recognition.grammars = speechRecognitionList	
		this.recognition.lang = 'en-US';
		this.recognition.interimResults = false;
		this.recognition.maxAlternatives = 10;
		}

	startRecording(e) {
		if (this.props.gameMode === "single" && this.props.turn === "black") {
			e.preventDefault()
			return;
		}
		
		this.setState({
			recording: true,
			message: false
		})

		this.recognition.start()

		this.recognition.addEventListener('result', (e) => {
			let last = e.results.length - 1;
			let options = e.results[last]
			for (let option of options) {
				if (this.commands.indexOf(option.transcript) > -1) {
					this.props.executeCommand(option.transcript)
					return
				}
			}
			this.setState({
				message: `Command "${options[0].transcript}" not recognized`
			})
		}, { once: true });

		this.recognition.onspeechend = function() {
  			this.recognition.stop();
  			this.setState({
  				recording:false
  			})
		}.bind(this)

	}

	convertMoveToAlgebraic() {
		let piece = this.props.lastMove[0];
		let destination = this.props.lastMove[1];
		return `${piece.type} to ${String.fromCharCode(65 + destination.x)}${destination.y+1}`
	}

	render() {
		const classes = "hud" + (this.props.gameMode === "single" && 
								 this.props.turn === "black" ?
								 " deactivated" :
								 "")
		
		return (
			<div className={classes}>
				<div className="hud-grid">
					<div className="hud-left">
						<h1>{this.props.playerNames[this.props.turn]}</h1>
						<h4>Last Move: {this.props.lastMove ? this.convertMoveToAlgebraic() : ""}</h4>
						<h4 className="turn">Turn: {this.props.turnCount}</h4>		
						<div>{this.state.message}</div>
					</div>
					<div className="hud-right">
						{!this.state.recording && 
							<form onSubmit={this.startRecording}>
								<input className="voiceCommand" type="submit" value=""/>
								<h4>Voice Command</h4>
							</form>
						}
						{this.state.recording &&
							<div>Listening...</div>
						}
					</div>
				</div>
				<div></div>
			</div>
		)
	}
}

Hud.propTypes = {
	playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
	turn: PropTypes.oneOf(['white', 'black']).isRequired,
	turnCount: PropTypes.number.isRequired,
	executeCommand: PropTypes.func.isRequired,
	lastMove: PropTypes.arrayOf(PropTypes.object),
	gameMode: PropTypes.oneOf(["single", "local", "multi"]),
	capturedPieces: PropTypes.shape({
		white: PropTypes.shape({
			rook: PropTypes.array,
			knight: PropTypes.array,
			bishop: PropTypes.array,
			queen: PropTypes.array,
			king: PropTypes.array,
			pawn: PropTypes.array
		}),
		black: PropTypes.shape({
			rook: PropTypes.array,
			knight: PropTypes.array,
			bishop: PropTypes.array,
			queen: PropTypes.array,
			king: PropTypes.array,
			pawn: PropTypes.array
		})
	})
}

export default Hud