import React, { Component } from 'react';

class Hud extends Component {
	constructor(props) {
		super(props)
		this.state = {
			recording: false
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
		console.log(grammar)

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
		this.recognition = new SpeechRecognition();
		const speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString(grammar, 1);
		this.recognition.grammars = speechRecognitionList	
		this.recognition.lang = 'en-US';
		this.recognition.interimResults = false;
		this.recognition.maxAlternatives = 5;
		console.log(this.recognition)
		}

	startRecording(e) {
		e.preventDefault()
		// this.setState({
		// 	recording: true
		// })
		this.recognition.start()
		this.recognition.addEventListener('result', (e) => {
			let last = e.results.length - 1;
			let options = e.results[last]
			for (let option of options) {
				console.log(option.transcript, this.commands)
				if (this.commands.indexOf(option.transcript) > -1) {
					console.log("command found: ", option)
					this.props.executeCommand(option.transcript)
					return
				}
			}
			console.log("command not found")
		});
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
		console.log(this.props)
		
		return (
			<div className="hud">
				<h2>Voice Command </h2>
				{!this.state.recording && 
					<form onSubmit={this.startRecording}>
						<input type="submit" value="Enter Command"/>
					</form>
				}
				<h2>Turn: {this.props.turnNumber}</h2>
				<h2>Captured Pieces:</h2>
				
				<div>
					<div>White</div>
					<ul>
					{capturedWhite && capturedWhite["pawn"].length>0 &&
						<li>{"Pawns: " + capturedWhite["pawn"].length}</li>
					}
					{capturedWhite && capturedWhite["rook"].length>0 &&
						<li>{"Rooks: " + capturedWhite["rook"].length}</li>
					}
					{capturedWhite && capturedWhite["knight"].length>0 &&
						<li>{"Knights: " + capturedWhite["knight"].length}</li>
					}
					{capturedWhite && capturedWhite["bishop"].length>0 &&
						<li>{"Bishops: " + capturedWhite["bishop"].length}</li>
					}
					{capturedWhite && capturedWhite["queen"].length>0 &&
						<li>{"Queen: " + capturedWhite["queen"].length}</li>
					}
					</ul>
					
					<div>Black</div>
					<ul>
					{capturedBlack && capturedBlack["pawn"].length>0 &&
						<li>{"Pawns: " + capturedBlack["pawn"].length}</li>
					}
					{capturedBlack && capturedBlack["rook"].length>0 &&
						<li>{"Rooks: " + capturedBlack["rook"].length}</li>
					}
					{capturedBlack && capturedBlack["knight"].length>0 &&
						<li>{"Knights: " + capturedBlack["knight"].length}</li>
					}
					{capturedBlack && capturedBlack["bishop"].length>0 &&
						<li>{"Bishops: " + capturedBlack["bishop"].length}</li>
					}
					{capturedBlack && capturedBlack["queen"].length>0 &&
						<li>{"Queen: " + capturedBlack["queen"].length}</li>
					}
					</ul>

				</div>
				
			</div>
		)
	}
}

export default Hud