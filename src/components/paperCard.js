import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'

const style = {
  width: 500,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const paperCard = (props) => (
  <div>
      {props.welcomeText && 
      	<div>
	      	<h2>
	      	  {props.gameMode}
	      	</h2>
	      	<h5>
	      	  {props.welcomeText}
	      	</h5>
	      </div>
      }
    <Paper style={style} zDepth={3}>
      {props.value &&
      	<div>
	        <h4> Enter name for {props.color} </h4> 
	      	<TextField
	          hintText={props.value}
	          floatingLabelText={`Player ${props.player}`}
	          onChange={(e)=> {props.handleChange(e, `${props.color}`)}}
	        />
	        {props.difficulty &&
	        	<span>
	        	<span>ai difficulty: {props.difficulty}
	        	<span onClick={(e) => {props.handleDifficulty(e, '+')}}>+</span>
	        	<span onClick={(e) => props.handleDifficulty(e, '-')}>-</span>

	        	</span>
	        	</span>
	        }
	      </div>
      }
    </Paper>
  </div>
);

export default paperCard;