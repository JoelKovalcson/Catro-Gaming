export const tetrisConfig = {
	grid: {
		rows: 20,
		cols: 12
	},
	nextBlock: {
		rows: 4,
		cols: 4
	},
	TETRIS_BLOCKS: [
		// J
		[
			[
				['J', '', '', ''],
				['J', 'J', 'J', ''],
				['', '', '', ''],
				['', '', '', '']
			],
			[
				['', 'J', 'J', ''],
				['', 'J', '', ''],
				['', 'J', '', ''],
				['', '', '', '']
			],
			[
				['', '', '', ''],
				['J', 'J', 'J', ''],
				['', '', 'J', ''],
				['', '', '', '']
			],
			[
				['', 'J', '', ''],
				['', 'J', '', ''],
				['J', 'J', '', ''],
				['', '', '', '']
			]
		],
		// L
		[
			[
				['', '', '', ''],
				['L', 'L', 'L', ''],
				['L', '', '', ''],
				['', '', '', '']
			],
			[
				['L', 'L', '', ''],
				['', 'L', '', ''],
				['', 'L', '', ''],
				['', '', '', '']
			],
			[
				['', '', 'L', ''],
				['L', 'L', 'L', ''],
				['', '', '', ''],
				['', '', '', '']
			],
			[
				['', 'L', '', ''],
				['', 'L', '', ''],
				['', 'L', 'L', ''],
				['', '', '', '']
			]
		],
		// T
		[
			[
				['', 'T', '', ''],
				['T', 'T', 'T', ''],
				['', '', '', ''],
				['', '', '', '']
			],
			[
				['', 'T', '', ''],
				['', 'T', 'T', ''],
				['', 'T', '', ''],
				['', '', '', '']
			],
			[
				['', '', '', ''],
				['T', 'T', 'T', ''],
				['', 'T', '', ''],
				['', '', '', '']
			],
			[
				['', 'T', '', ''],
				['T', 'T', '', ''],
				['', 'T', '', ''],
				['', '', '', '']
			]
		],
		// I
		[
			[
				['', 'I', '', ''],
				['', 'I', '', ''],
				['', 'I', '', ''],
				['', 'I', '', '']
			],
			[
				['', '', '', ''],
				['I', 'I', 'I', 'I'],
				['', '', '', ''],
				['', '', '', '']
			]
		],
		// Z
		[
			[
				['', '', '', ''],
				['Z', 'Z', '', ''],
				['', 'Z', 'Z', ''],
				['', '', '', '']
			],
			[
				['', '', 'Z', ''],
				['', 'Z', 'Z', ''],
				['', 'Z', '', ''],
				['', '', '', '']
			]
		],
		// S
		[
			[
				['', '', '', ''],
				['', 'S', 'S', ''],
				['S', 'S', '', ''],
				['', '', '', '']
			],
			[
				['S', '', '', ''],
				['S', 'S', '', ''],
				['', 'S', '', ''],
				['', '', '', '']
			]
		],
		// O
		[
			[
				['', 'O', 'O', ''],
				['', 'O', 'O', ''],
				['', '', '', ''],
				['', '', '', '']			
			]
		]
	]
}

export function canMove(board, shape, rotation, x, y) {
	const block = shape[rotation];
	for(let r = 0; r < block.length; r++) {
		for(let c = 0; c < block[r].length; c++) {
			if(block[r][c]) {
				const nextX = c+x;
				const nextY = r+y;
				// Skip rows that are above the board
				if (nextY < 0) continue;
				// If too far left or too far right, this won't work
				if (nextX < 0 || nextX >= tetrisConfig.grid.cols) return false;
				if (nextY >= tetrisConfig.grid.rows) return false;

				// Get the board's row
				const nextRow = board[nextY];
				// Make sure it's not below the board
				if (nextRow) {
					// If there is already something there
					if(nextRow[nextX]) {
						return false;
					}
				} else return false;
			}
		}
	}
	return true;
}

export function randomBlock() {
	let blockIndex = Math.floor(Math.random() * tetrisConfig.TETRIS_BLOCKS.length);
	let block = tetrisConfig.TETRIS_BLOCKS[blockIndex];
	let rotationIndex = Math.floor(Math.random() * block.length);
	return [block, rotationIndex];
}

export function defaultBoard() {
	const grid = [];
	for(let r = 0; r < tetrisConfig.grid.rows; r++) {
		grid.push([]);
		for(let c = 0; c < tetrisConfig.grid.cols; c++) {
			grid[r].push('');
		}
	}
	return grid;
}

export function mergeBlock(board, shape, rotation, x, y) {
	let gameOver = false;
	const block = shape[rotation];
	for(let r = 0; r < block.length; r++) {
		for(let c = 0; c < block[r].length; c++) {
			if(block[r][c]) {
				// Found a part of the block above the board
				if(r + y < 0) {
					gameOver = true;
				} else {
					// Set the board to the color of the block
					board[r+y][c+x] = block[r][c];
				}
			}
		}
	}
	return gameOver;
}

export function scoreBoard(board) {
	let points = false;
	let newBoard = [...board];
	let scoredRows = 0;
	
	// Start at bottom of board and move up
	for(let r = newBoard.length-1; r >= 0; r--) {
		let scoredRow = true;
		for(let c = 0; c < newBoard[r].length; c++) {
			// If any spot on that row is empty, there is nothing to score on this row
			if(!newBoard[r][c]) {
				scoredRow = false;
				break;
			}
		}
		// If we scored on this row...
		if (scoredRow) {
			scoredRows++;
			// Starting at the current row, replace all rows with the previous row
			for(let newR = r; newR >= 0; newR--) {
				// If we hit the top, make a new row
				if(newR - 1 < 0) newBoard[newR] = Array(newBoard[newR].length).fill('');
				// Otherwise, use the previous row to shift everything down one
				else newBoard[newR] = newBoard[newR-1];
			}
			// And put the row back where it was to check again
			r++;
		}
	}

	// If we scored any rows
	if (scoredRows) {
		// Using original scoring for Tetris
		switch(scoredRows) {
			case 1:
				points = 40;
				break;
			case 2:
				points = 100;
				break;
			case 3:
				points = 300;
				break;
			case 4:
				points = 1200;
				break;
			default:
				// This should never happen
				points = 0;
				break;
		}
	}

	return [points, newBoard, scoredRows];
}