import React, { Component } from 'react';

const Algebra = (props) => {
	var label = ""
	props.pos.y === -1 && props.pos.x !== -1 ?
		label = String.fromCharCode(65 + props.pos.x) :
		label = props.pos.y === -1 ? "" : props.pos.y + 1
	return (
		<div className="algebra">
			{label}
		</div>
	)
}


export default Algebra