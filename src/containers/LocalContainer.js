import React, { Component } from 'react';

class LocalContainer extends Component {
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
	      <h1>Localhost</h1>
	    </div>
	  )
	}
}

export default LocalContainer;