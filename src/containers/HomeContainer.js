import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeContainer extends Component {

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
