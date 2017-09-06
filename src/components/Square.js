import React, { Component } from 'react';
import blackbishop from "../assets/blackbishop.png"
import whitebishop from "../assets/whitebishop.png"
import blackknight from "../assets/blackknight.png"
import whiteknight from "../assets/whiteknight.png"
import blackqueen from "../assets/blackqueen.png"
import whitequeen from "../assets/whitequeen.png"
import blackking from "../assets/blackking.png"
import whiteking from "../assets/whiteking.png"
import blackpawn from "../assets/blackpawn.png"
import whitepawn from "../assets/whitepawn.png"
import blackrook from "../assets/blackrook.png"
import whiterook from "../assets/whiterook.png"

const images = {
	blackbishop : blackbishop,
whitebishop : whitebishop,
blackknight : blackknight,
whiteknight : whiteknight,
blackqueen : blackqueen,
whitequeen : whitequeen,
blackking : blackking,
whiteking : whiteking,
blackpawn : blackpawn,
whitepawn : whitepawn,
blackrook : blackrook,
whiterook : whiterook
}

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