		let capturedWhite = this.props.capturedPieces["white"]
		let capturedBlack = this.props.capturedPieces["black"]
<div>
					<div className="playerName">{this.props.playerNames.white + " (White)"}</div>
					<ul>
					{capturedWhite && capturedWhite["pawn"].length>0 &&

						capturedWhite["pawn"].map((pawn) => (
							<li className="captured">
								<img src={images.whitepawn}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["rook"].length>0 &&

						capturedWhite["rook"].map((rook) => (
							<li className="captured">
								<img src={images.whiterook}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["knight"].length>0 &&

						capturedWhite["knight"].map((knight) => (
							<li className="captured">
								<img src={images.whiteknight}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["bishop"].length>0 &&

						capturedWhite["bishop"].map((bishop) => (
							<li className="captured">
								<img src={images.whitebishop}/>
							</li>
						))
						
					}
					{capturedWhite && capturedWhite["queen"].length>0 &&

						capturedWhite["queen"].map((queen) => (
							<li className="captured">
								<img src={images.whitequeen}/>
							</li>
						))
						
					}
					
					</ul>
					
					<div className="playerName">{this.props.playerNames.black + " (Black)"}</div>
					<ul>
					{capturedBlack && capturedBlack["pawn"].length>0 &&
						capturedBlack["pawn"].map((pawn) => (
							<li className="captured">
								<img src={images.blackpawn}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["rook"].length>0 &&
						capturedBlack["rook"].map((rook) => (
							<li className="captured">
								<img src={images.blackrook}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["knight"].length>0 &&
						capturedBlack["knight"].map((knight) => (
							<li className="captured">
								<img src={images.blackknight}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["bishop"].length>0 &&
						capturedBlack["bishop"].map((bishop) => (
							<li className="captured">
								<img src={images.blackbishop}/>
							</li>
						))
					}
					{capturedBlack && capturedBlack["queen"].length>0 &&
						capturedBlack["queen"].map((queen) => (
							<li className="captured">
								<img src={images.blackqueen}/>
							</li>
						))
					}
					</ul>

				</div>