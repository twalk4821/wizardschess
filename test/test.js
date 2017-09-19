let chai = require('chai')
assert = require('assert')
chai.should() 

const board = require('../board.js');
const pieces = require('../pieces.js');
const math = require('../math.js');

describe('board', () => {
	const gameBoard = new board()

	it('should have an init method', () => {
		gameBoard.init.should.be.a('function')
	})

	it('initialized game board should have an 8x8 array representing the state of the board', () => {
		gameBoard.init()
		gameBoard.grid.should.have.lengthOf(8)
		gameBoard.grid[0].should.have.lengthOf(8)
	})

	it('should be able to add a piece', () => {
		let piece = pieces.makePiece("pawn", "white")
		gameBoard.addPiece(piece, 4, 4)
		gameBoard.grid[4][4].type.should.equal("pawn")
	})

	describe('should have the correct layout', () => {
		it('row 0 should be white and have order: r,k,b,q,k,b,k,r', () => {
			let row = gameBoard.grid[0];
			row[0].type.should.equal('rook')
			row[1].type.should.equal('knight')
			row[2].type.should.equal('bishop')
			row[3].type.should.equal('queen')
			row[4].type.should.equal('king')
			row[5].type.should.equal('bishop')
			row[6].type.should.equal('knight')
			row[7].type.should.equal('rook')
			row.forEach(piece => {
				piece.color.should.equal('white')
			})
		})

		it('row 1 should be all white pawns', () => {
			let row = gameBoard.grid[1]
			row.forEach(piece => {
				piece.type.should.equal('pawn');
				piece.color.should.equal('white');
			});
		});

		it('row 6 should be all black pawns', () => {
			let row = gameBoard.grid[6]
			row.forEach(piece => {
				piece.type.should.equal('pawn');
				piece.color.should.equal('black');
			});
		})

		it('row 0 should be white and have order: r,b,k,k,q,b,k,r', () => {
			let row = gameBoard.grid[7];
			row[0].type.should.equal('rook')
			row[1].type.should.equal('knight')
			row[2].type.should.equal('bishop')
			row[3].type.should.equal('queen')
			row[4].type.should.equal('king')
			row[5].type.should.equal('bishop')
			row[6].type.should.equal('knight')
			row[7].type.should.equal('rook')
			row.forEach(piece => {
				piece.color.should.equal('black')
			})
		});
	});
});	

describe('pieces', () => {
	const gameBoard = new board()
	gameBoard.init()

	describe("pawn", () => {
		let piece = pieces.makePiece("pawn", "white")
		it('should have type: pawn', () => {
			piece.type.should.equal("pawn")
		})
		
		it('should be able to initialize a color', () => {
			piece.color.should.equal('white')
		})

		it('should have moveset: up, up-right, and up-left', () => {
			piece.moveset.should.include('up', 'up-right', 'up-left')
		})

		it('should have range 1', () => {
			piece.range.should.equal(1)
		})

		describe("movement", () => {
			it('should be able to recognize vector in moveset', () => {
				let move = new math.Vector(0,1)
				piece.moveInMoveset(move).x.should.equal(0) 
				piece.moveInMoveset(move).y.should.equal(1) 


			})

			it('should not allow moves outside of range', () => {
				let move = new math.Vector(0,3)
				piece.moveInMoveset(move).should.equal(false)
			})

			it('should be able to move', () => {
				gameBoard.movePiece(7, 1, 7, 2)
				gameBoard.pieceAt(7, 2).type.should.equal("pawn")
			})

			describe("should appropriately handle obstructed movement", () => {
				it('for blocking piece of same color', () => {
					let pawn = pieces.makePiece("pawn", "white")
					gameBoard.addPiece(pawn, 7, 3)
					gameBoard.movePiece(7,2,7,3).should.equal(false)
				})

				it('for blocking opponent', () => {
					let pawn = pieces.makePiece("pawn", "black")
					gameBoard.addPiece(pawn, 7, 4)
					gameBoard.movePiece(7,2,7,3).should.equal(false)
				})

				it('should capture diagonally', () => {
					let pawn = pieces.makePiece("pawn", "black")
					gameBoard.addPiece(pawn, 6, 4)
					gameBoard.movePiece(7,3,6,4)
					gameBoard.pieceAt(6,4).color.should.equal("white")
				})
			})
			
		})
		
	})

	describe("rook", () => {
		let piece = pieces.makePiece("rook", "white")
		it('should have type: rook', () => {
			piece.type.should.equal("rook")
		})
		
		it('should be able to initialize a color', () => {
			piece.color.should.equal('white')
		})

		it('should have moveset: up, down, left, right', () => {
			piece.moveset.should.include('up', 'down', 'left', 'right')
		})

		it('should have range 8', () => {
			piece.range.should.equal(8)
		})

	
	})

	describe("knight", () => {
		let piece = pieces.makePiece("knight", "white")
		it('should have type: knight', () => {
			piece.type.should.equal("knight")
		})
		
		it('should be able to initialize a color', () => {
			piece.color.should.equal('white')
		})

		it('should have knight moveset', () => {
			piece.moveset.should.include("knight-1", "knight-2", "knight-3", "knight-4", "knight-5", "knight-6", "knight-7", "knight-8")
		})

		it('should have range 1', () => {
			piece.range.should.equal(1)
		})
	})

	describe("bishop", () => {
		let piece = pieces.makePiece("bishop", "white")
		it('should have type: bishop', () => {
			piece.type.should.equal("bishop")
		})
		
		it('should be able to initialize a color', () => {
			piece.color.should.equal('white')
		})

		it('should have moveset: up-right, up-left, down-right, down-left', () => {
			piece.moveset.should.include("up-right", "up-left", "down-right", "down-left")
		})

		it('should have range 8', () => {
			piece.range.should.equal(8)
		})

	})

	describe("queen", () => {
		let piece = pieces.makePiece("queen", "white")
		it('should have type: queen', () => {
			piece.type.should.equal("queen")
		})
		
		it('should be able to initialize a color', () => {
			piece.color.should.equal('white')
		})

		it('should have moveset: up, down, left, right', () => {
			piece.moveset.should.include('up', 'down', 'left', 'right')
		})

		it('should have range 8', () => {
			piece.range.should.equal(8)
		})
	})

	describe("king", () => {
		let piece = pieces.makePiece("king", "white")
		it('should have type: king', () => {
			piece.type.should.equal("king")
		})
		
		it('should be able to initialize a color', () => {
			piece.color.should.equal('white')
		})

		it('should have moveset: up, down, left, right', () => {
			piece.moveset.should.include('up', 'down', 'left', 'right')
		})

		it('should have range 1', () => {
			piece.range.should.equal(1)
		})
	})

})

describe('math', () => {
	it('should be able to add two vectors', () => {
		let a = new math.Vector(2, 1);
		let b = new math.Vector(-2, -1);
		let c = math.Vector.add(a, b);
		c.x.should.equal(0);
		c.y.should.equal(0);
	})

	it('should be able to add two vectors', () => {
		let a = new math.Vector(2, 1);
		let b = new math.Vector(2, 1);
		let c = math.Vector.subtract(a, b);
		c.x.should.equal(0);
		c.y.should.equal(0);
	})

	it('should calculate the hypotenuse', () => {
		let a = new math.Vector(3, 4);
		a.hyp().should.equal(5)
	})

	it('should calculate the angle', () => {
		let a = new math.Vector(1,0);
		a.theta().should.equal(0);
	})

	it('should tell when two vectors are scalar factors of each other', () => {
		let a = new math.Vector(1,1);
		let b = new math.Vector(4,4);
		math.Vector.vectorsAreScalarFactors(a,b).should.equal(true)
	})

	describe('should be able to convert moves to vectors', () => {
		it('up', () => {
			let a = math.Vector.moveAsVector("up")
			a.x.should.equal(0)
			a.y.should.equal(1)
		})
	})
})



