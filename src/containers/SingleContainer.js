import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { Paper } from 'material-ui/Paper';
import Paper from '../components/paperCard.js';
import RaisedButton from 'material-ui/RaisedButton'; 

class SingleContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	white: "Harry",
	  	black: "Draco",
	  	redirect: false, 
	  	difficulty: 5,
	  	gameMode: 'Single Player',
	  	welcomeText: 'Test your skills against the computer! Customize player names and AI difficulty below. Press start to begin.'
	  }
	  //bind functions
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleDifficulty = this.handleDifficulty.bind(this);
	}

  handleDifficulty(e, sign){
  	let diff = sign === '+' ? this.state.difficulty + 1 : this.state.difficulty - 1;
  	console.log('inside set difficulty', this.state.difficulty);
  	console.log('inside set difficulty adding', diff);

  	this.setState({
  		difficulty: diff 
  	})
  }
	handleChange(e, color) {
		console.log(e, color)
		switch (color) {
			case "black":
				this.setState({
					black: e.target.value
				})
				break;
			case "white":
				this.setState({
					white: e.target.value
				})
			default:
				break;
		}	
	}

	handleSubmit() {
		let names = {
        white: this.state.white,
        black: this.state.black
      };
		this.props.updatePlayerNames(names);
		this.setState({
			redirect: true
		})
	}

	render(){
	  return(
	  	<div>
		  	<div className="App-header">
		  	  <Link to='/'>
			  	  <h2>Wizards Chess</h2>
				  </Link>
		  	</div>

		  	<form 
		  	  onSubmit={this.handleSubmit}
		  	  className='formFlexbox'
		  	>
		  	  <Paper
		  	    className='formFlexitem'
		  	    gameMode={this.state.gameMode}
		  	    welcomeText={this.state.welcomeText}
		  	  />
		  	  <Paper
		  	    value={this.state.white}
		  	    player='1'
		  	    className='inputName'
		  	    className='formFlexitem'
		  	    handleChange={this.handleChange}
		  	    color='white'
		  	  />
		  	  <Paper 
		  	    value={this.state.black}
		  	    player='2'
		  	    className='formFlexitem'
		  	    className='inputName'
		  	    handleChange={this.handleChange}
		  	    difficulty={this.state.difficulty}
		  	    handleDifficulty={this.handleDifficulty}
		  	    color='black'
  	  	  />
			  	<RaisedButton
			  	  label='Start Game' 
			  	  type='submit'
		  	    className='formFlexitem'
			  	/>
	   	  </form>
	    
		    {this.state.redirect &&
		    	<Redirect to="/game" />
		    }
	   </div>
	  )
	}
}

export default SingleContainer;
			  	//   <h2>Player 1: 
			   //  	  <input className="inputName" value={this.state.white} onChange={(e) => {this.handleChange(e, "white")}} />
		    // 	  </h2>
		    
	    	//   <h2> Player 2:
				  // 	<input className="inputName" value={this.state.black} onChange={(e) => {this.handleChange(e, "black")}} /> 
			  	// </h2>