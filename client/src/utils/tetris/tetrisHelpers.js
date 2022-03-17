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

export function canMove() {
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
	for(let c = 0; c < tetrisConfig.grid.cols; c++) {
		grid.push([]);
		for(let r = 0; r < tetrisConfig.grid.rows; r++) {
			grid[c].push('');
		}
	}
	return grid;
}

export function getNextRotation(shape, rotation) {
	return (rotation+1) % shape.length;
}