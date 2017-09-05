import React, { Component } from 'react';

class Square extends Component {
	constructor(props) {
		super(props)
		this.state = {
			active: false
		}
		this.toggleActive = this.toggleActive.bind(this)
	}

	toggleActive() {
		this.setState({
			active: !this.state.active
		})
	}

	isEqualTo(square) {
		return square.props.pos.x === this.props.pos.x && square.props.pos.y === this.props.pos.y
	}

	render() {
		var classes = this.state.active ? "square active " : "square " + (this.props.piece ? this.props.piece.color : "")
		return (
			<div className={classes} onClick={() => this.props.toggle(this)}>
				{this.props.piece ? this.props.piece.type : null}
			</div>
		)
	}
}

export default Square