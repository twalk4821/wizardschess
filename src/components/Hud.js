import React, { Component } from 'react';
import images from '../assets/images.js'

class Hud extends Component {
	constructor(props) {
		super(props)
		this.state = {
			recording: false,
			message: false
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
		this.recognition.maxAlternatives = 5;
		}

	startRecording(e) {
		e.preventDefault()
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
				message: "Command not recognized!"
			})
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
		
		return (
			<div className="hud">
				<h2>Voice Command </h2>
				{this.state.message &&
					<div>{this.state.message}</div>
				}
				{!this.state.recording && 
					<form onSubmit={this.startRecording}>
						<input className="voiceCommand" type="submit" value="Enter Command"/>
					</form>
				}

				{this.state.recording &&
					<div>Listening...</div>
				}
				<h2>Turn: {this.props.turnNumber}</h2>
				<h2>Captured Pieces:</h2>
				
				<div>
					<div>{this.props.playerNames.white + " (White)"}</div>
					<ul>
					{capturedWhite && capturedWhite["pawn"].length>0 &&

						capturedWhite["pawn"].map((pawn) => (
							<li className="captured">
								<img src={images.whitepawn}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["rook"].length>0 &&

						capturedWhite["rook"].map((rook) => (
							<li className="captured">
								<img src={images.whiterook}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["knight"].length>0 &&

						capturedWhite["knight"].map((knight) => (
							<li className="captured">
								<img src={images.whiteknight}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["bishop"].length>0 &&

						capturedWhite["bishop"].map((bishop) => (
							<li className="captured">
								<img src={images.whitebishop}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["queen"].length>0 &&

						capturedWhite["queen"].map((queen) => (
							<li className="captured">
								<img src={images.whitequeen}/>
							</li>
						))
						
					}
					
					</ul>
					
					<div>{this.props.playerNames.black + " (Black)"}</div>
					<ul>
					{capturedBlack && capturedBlack["pawn"].length>0 &&
						capturedBlack["pawn"].map((pawn) => (
							<li className="captured">
								<img src={images.blackpawn}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["rook"].length>0 &&
						capturedBlack["rook"].map((rook) => (
							<li className="captured">
								<img src={images.blackrook}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["knight"].length>0 &&
						capturedBlack["knight"].map((knight) => (
							<li className="captured">
								<img src={images.blackknight}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["bishop"].length>0 &&
						capturedBlack["bishop"].map((bishop) => (
							<li className="captured">
								<img src={images.blackbishop}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["queen"].length>0 &&
						capturedBlack["queen"].map((queen) => (
							<li className="captured">
								<img src={images.blackqueen}/>
							</li>
						))
					}
					</ul>

				</div>
				
			</div>
		)
	}
}

export default Hud