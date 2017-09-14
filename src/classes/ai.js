const scores = {
	pawn: 1,
	bishop: 3,
	knight: 3,
	rook: 5,
	queen: 9,
	king: 0
}

function getCurrentScore(board) {

	function getScore(color) {
		let total = 0;
		for (let pieceType in board.livePieces[color]) {
			let score = scores[pieceType];
			total += score*board.livePieces[color][pieceType].length
		}
		return total;
	}

	const whiteScore = getScore("white");
	const blackScore = getScore("black");

	return whiteScore - blackScore;
}

function getBestMove(board, N) {
	let bestMove = {
		piece: null,
		destination: null,
		score: Number.POSITIVE_INFINITY
	}

	for (let pieceType in board.livePieces["black"]) {
		for (let piece of board.livePieces["black"][pieceType]) {
			const moveset = piece.availableMoves
			for (let move of moveset) {
				const simulatedBoard = board.copy();
				simulatedBoard.simulateMove(piece, move);
				if (simulatedBoard.isCheck("black")) continue; 
				const minScore = getBestScoreForMove(simulatedBoard, N)
				if (minScore < bestMove.score) {
					bestMove = {
						piece: piece,
						destination: move,
						score: minScore
					}
				}
			}
		}
	}

	return bestMove;
}

function getBestScoreForMove(board, N) {
	let turn = "white";
	let totalScore = getCurrentScore(board);

	function getNextMove() {
		let currentBestMove = null;
		for (let pieceType in board.livePieces[turn]) {
			for (let piece of board.livePieces[turn][pieceType]) {
				const moveset = piece.availableMoves
				for (let move of moveset) {
					const simulatedBoard = board.copy();
					simulatedBoard.simulateMove(piece, move);
					if (simulatedBoard.isCheck(turn)) continue; 
					const score = getCurrentScore(simulatedBoard);
					if (!currentBestMove) {
						currentBestMove = {
							piece: piece,
							destination: move,
							score: score
						}
					} else {
						if (turn === "white") {
							if (score > currentBestMove.score) {
								currentBestMove = {
									piece: piece,
									destination: move,
									score: score
								}
							}
						} else {
							if (score < currentBestMove.score) {
								currentBestMove = {
									piece: piece,
									destination: move,
									score: score
								}
							}
						}
					}
				}
			}
		}

		return currentBestMove;
	}

	while (N>0) {
		board.updateAvailableMoves(turn);
		console.log(board)
		let nextMove = getNextMove();
		if (!nextMove) break;
		board.simulateMove(nextMove.piece, nextMove.destination);
		totalScore += getCurrentScore(board)
		turn === "white" ? turn = "black" : turn = "white";
		N--;
	}

	return totalScore;
	
}

export default {
	getBestMove: getBestMove
}