import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			white: "Harry",
			black: "Draco",
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
			white: this.state.white,
			black: this.state.black
		}
		this.props.updatePlayerNames(names)
	}
	render() {
		return (
			<div className="homeContainer"> 

			<div className="App-header">
			  <h2>Wizards Chess</h2>
			</div>

			<div className="mainMenu">
			  <div className="mainMenuItem">
			    <Link to="/single">Single Player</Link> 
			  </div>
			  <div className="mainMenuItem">
			    <Link to="/local">Localhost</Link> 
			  </div>
			  <div className="mainMenuItem">
			    <Link to="/multi">Multi Player</Link> 
			  </div>
			  <div className="mainMenuItem">
			    <Link to="/options">Options</Link> 
			  </div>
			</div>
				
			</div>
		)
	}
}

export default HomeContainer;
