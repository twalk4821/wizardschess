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

function getBestMove(board, N, turn = "black") {
	let bestMove = null

	for (let pieceType in board.livePieces[turn]) {
		for (let piece of board.livePieces[turn][pieceType]) {
			const moveset = piece.availableMoves
			for (let move of moveset) {
				const simulatedBoard = board.copy();
				simulatedBoard.simulateMove(piece, move);
				if (simulatedBoard.isCheck(turn)) continue;
				if (simulatedBoard.isCheckmate(turn === "white" ? "black" : "white")) return {
						piece: piece,
						destination: move,
						score: 0
					}  
				const minScore = getBestScoreForMove(simulatedBoard, N, turn)
				if (!bestMove) {
					bestMove = {
						piece: piece,
						destination: move,
						score: minScore
					}
				} else if (minScore === bestMove.score) {
					let rand = Math.random();
					if (rand >= .5) {
						bestMove = {
							piece: piece,
							destination: move,
							score: minScore
						}
					}
				} else if (turn === "black") {
					if (minScore < bestMove.score) {
						bestMove = {
							piece: piece,
							destination: move,
							score: minScore
						}
					}	
				} else {
					if (minScore > bestMove.score) {
						bestMove = {
							piece: piece,
							destination: move,
							score: minScore
						}
					}
				}
				
			}
		}
	}

	return bestMove;
}

function getBestScoreForMove(board, N, turn) {
	let totalScore = getCurrentScore(board);

	while (N>0) {
		turn === "white" ? turn = "black" : turn = "white";
		board.updateAvailableMoves(turn)
		let nextMove = getBestMove(board, N-1, turn);
		if (!nextMove) break;
		board.simulateMove(nextMove.piece, nextMove.destination);
		totalScore += getCurrentScore(board)
		N--;
	}

	return totalScore;
	
}

export default {
	getBestMove: getBestMove
}