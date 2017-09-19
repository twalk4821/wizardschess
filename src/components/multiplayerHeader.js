import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  width: 400,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const multiplayerHeader = (props) => (
  <span>
    <Paper style={style} zDepth={3}>
      {props.type &&
      	<span>
	        <h4> {props.type} </h4> 
	        <p>{props.message}</p>
	      	<TextField
	          hintText={props.value}
	          floatingLabelText={props.value}
	          onChange={(e)=> {props.handleChange(e, `${props.color}`)}}
	        />
	      </span>
      }
    </Paper>
  </span>
);

export default multiplayerHeader;