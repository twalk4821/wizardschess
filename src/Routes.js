import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer.js'
import GameContainer from './containers/GameContainer.js'


export default (props) => (
  <Switch>
	  <Route path="/game" exact render={() => (
	  	<GameContainer playerNames={props.playerNames} />
	  )} />

	  <Route path="/" render={() => (
	  	<HomeContainer updatePlayerNames={props.updatePlayerNames} />
	  )}/>

	  { /* Finally, catch all unmatched routes */ }
	    <Route path="/" render={() => (
	  		<HomeContainer updatePlayerNames={props.updatePlayerNames} />
	  	)}/>
  </Switch>
);