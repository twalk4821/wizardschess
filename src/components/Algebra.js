import React from 'react';
import './Algebra.css'

import PropTypes from 'prop-types'

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

Algebra.propTypes = {
	pos: PropTypes.objectOf(PropTypes.number).isRequired
}


export default Algebra