import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			white: "",
			black: "",
			step: 1
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateNames = this.updateNames.bind(this)
	}
	handleChange(e) {
		this.state.step === 1 ?
		this.setState({
			white: e.target.value
		}) :
		this.setState({
			black: e.target.value
		})
	}
	handleSubmit(e) {
		e.preventDefault()
		this.setState({
			step: this.state.step + 1
		})

		if (this.state.step === 2) {
			this.updateNames()
		}
	}
	updateNames() {

		const names = {
			white: this.state.white.length > 0 ? this.state.white : "Harry",
			black: this.state.black.length > 0 ? this.state.black : "Lars"
		}
		this.props.updatePlayerNames(names)
	}
	render() {
		return (
			<div className="homeContainer"> 
			{this.state.step === 1 &&
				<div>
					<h1>Enter Username for White Player:</h1>
					<form onSubmit={this.handleSubmit}>
						<input value={this.state.white} onChange={this.handleChange}/>
						<input type="submit" value="Continue" />
					</form>
				</div>
			}
			{this.state.step === 2 && 
				<div>
					<h1>Enter Username for Black Player:</h1>
					<form onSubmit={this.handleSubmit}>
						<input value={this.state.black} onChange={this.handleChange}/>
						<input type="submit" value="Continue" onSubmit={this.handleSubmit}/>
					</form>
				</div>
			}
			{this.state.step === 3 && 
				<div>
					<h1>Ready to Play?</h1>
					<Link to="/game">Play Chess!</Link>
				</div>
			}
				
			</div>
		)
	}
}

export default HomeContainer;