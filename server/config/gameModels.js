// Default stats to track for all games
const defaultStats = {
	// Best score for that game
	bestScore: {
		type: Number,
		required: true,
		default: 0
	},
	// Number of times that game is played
	playedGames: {
		type: Number,
		required: true,
		default: 0
	}
}

// Stores each game's stat trackers
const gameDictionary = {
	tetris: {
		...defaultStats,
		// Store number of rows cleared in tetris
		rowsCleared: {
			type: Number,
			required: true,
			default: 0
		},
		highestLevel: {
			type: Number,
			required: true,
			default: 0
		}
	},
	yahtzee: {
		...defaultStats,
	}
};

module.exports = gameDictionary;