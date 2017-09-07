import React, { Component } from 'react';
import images from '../assets/images.js';
import './Square.css'

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
		if (this.props.piece) {
			console.log("../assets/" + this.props.piece.color + this.props.piece.type + ".png")
		}
		var classes = this.state.active ? "square active " : "square " + (this.props.piece ? this.props.piece.color : "")
		return (
			<div className={classes} onClick={() => this.props.toggle(this)}>
				{this.props.piece &&
					<img src={images[this.props.piece.color + this.props.piece.type]} height="50" width="50"/>
				}
			</div>
		)
	}
}

export default Square