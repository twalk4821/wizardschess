import React, { Component } from 'react';
import images from '../assets/images.js'
import './Hud.css'

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

	render() {
		let capturedWhite = this.props.capturedPieces["white"]
		let capturedBlack = this.props.capturedPieces["black"]
		
		return (
			<div className="hud">
				<h3>{this.props.playerNames[this.props.turn]}'s turn</h3>
				{!this.state.recording && 
					<form onSubmit={this.startRecording}>
						<input className="voiceCommand" type="submit" value="Voice"/>
					</form>
				}
				{this.state.recording &&
					<div>Listening...</div>
				}
				<div>{this.state.message}</div>
				<h4>Turn: {this.props.turnCount}</h4>		
			</div>
		)
	}
}

export default Hud