import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer.js'
import GameContainer from './containers/GameContainer.js'
{/*
import SingleContainer from './containers/SingleContainer.js'
import LocalContainer from './containers/LocalContainer.js'
import MultiContainer from './containers/MultiContainer.js'
*/}


export default (props) => (
  <Switch>
	  <Route path="/game" exact render={() => (
	  	<GameContainer playerNames={props.playerNames} />
	  )} />
  

	  {/*  TODO: add additional routes
	  <Route path="/single" exact render={() => (
	  	<SingleContainer updatePlayerNames={props.updatePlayerNames} />
	  )}/>

	  <Route path="/local" exact render={() => (
	  	<HomeContainer updatePlayerNames={props.updatePlayerNames} />
	  )}/>

	  <Route path="/multi" exact render={() => (
	  	<HomeContainer updatePlayerNames={props.updatePlayerNames} />
	  )}/>
	  */}

	  { /* Finally, catch all unmatched routes */ }
	    <Route path="/" render={() => (
	  		<HomeContainer updatePlayerNames={props.updatePlayerNames} />
	  	)}/>
  </Switch>
);