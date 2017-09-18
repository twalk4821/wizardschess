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

	static vectorsAreScalarFactors(a, b) {
		return a.theta() === b.theta()
	}
}



export default Vector