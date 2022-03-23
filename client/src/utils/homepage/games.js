const SINGLE_PLAYER_GAMES = [
	{
		name: 'Tetris',
		difficulty: [
			{difficulty: 'Easy', boardX: 12, boardY: 20, speed: 1000},
			{difficulty: 'Medium', boardX: 10, boardY: 18, speed: 800},
			{difficulty: 'Hard', boardX: 8, boardY: 16, speed: 600}
		],
		route: '/tetris'
	}
]

const MULTIPLAYER_GAMES = [
	{
		name: 'Yahtzee',
		minPlayers: 1,
		maxPlayers: 4,
		route: '/yahtzee',
		imageName: ''
	}
	/*
	{
		name: 'ChattleShip',
		minPlayers: 2,
		maxPlayers: 2,
		route: '/chattleship'
	},
	*/
]


module.exports = {SINGLE_PLAYER_GAMES, MULTIPLAYER_GAMES}