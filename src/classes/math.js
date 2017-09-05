class Vector {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}

	hyp() {
		return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y, 2))
	}

	theta() {
		return Math.acos(this.x/this.hyp())
	}

	static add(a, b) {
		return new Vector(a.x+b.x, a.y+b.y)
	}

	static subtract(a, b) {
		return new Vector(a.x-b.x, a.y-b.y)
	}

	static times(vector, a) {
		let result = new Vector(0,0)
		while (a>0) {
			result = Vector.add(result, vector)
			a--
		}
		return result
	}

	static moveAsVector(direction) {
		switch (direction) {
			case "up":
				return new Vector(0, 1)
			case "down":
				return new Vector(0, -1)
			case "right":
				return new Vector(1, 0);
			case "left":
				return new Vector(-1, 0)
			case "up-right":
				return new Vector(1, 1)
			case "up-left":
				return new Vector(-1, 1)
			case "down-right":
				return new Vector(-1, 1)
			case "down-left":
				return new Vector(-1, -1)

			//knight moves
			case "knight-1":
				return new Vector(1, 2)
			case "knight-2":
				return new Vector(2, 1)
			case "knight-3":
				return new Vector(2, -1)
			case "knight-4":
				return new Vector(1, -2)
			case "knight-5":
				return new Vector(-1, -2)
			case "knight-6":
				return new Vector(-2, -1)
			case "knight-7":
				return new Vector(-2, 1)
			case "knight-8":
				return new Vector(-1, 2)
		}
	}

	static vectorsAreScalarFactors(a, b) {
		return a.theta() === b.theta()
	}
}



export default Vector