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
	console.log(board, shape, rotation, x, y);
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