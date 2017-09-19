import React, { Component } from 'react';
import MultiplayerHeader from '../components/multiplayerHeader.js';

class MultiContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {}
	  //bind functions
	}


	render(){
	  return(
	  	<div>
	  	  <div className="App-header">
	  	    <h2>Wizards Chess</h2>
	  	  </div>
	      <h1>Multi Player</h1>
	      <MultiplayerHeader 
	        type='Host'
	        value='Create Room'
	        message='Create a gameroom and challenge opponents in public and private matches'
	      />
	      <MultiplayerHeader 
	        type='Join'
	        value='Enter Room'
	        message='Join a currently open gameroom to challenge or observe'
	      />
	    </div>
	  )
	}
}

export default MultiContainer;