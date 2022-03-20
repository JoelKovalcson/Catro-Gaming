module.exports = {
  content: [
		"./src/**/*.{js,jsx}",
		"./node_modules/tw-elements/dist/js/**/*.js"
	],
  theme: {
	  extend: {
		  screens: {
			  'sm': '475px'
		  },
		  colors: {
				'pastel-purple' : '#BB86FC',
				'dark-blue' : '#3700B3',
				'light-blue' : '#03DAC6',
				'background' : '#12121A',
				'light-background' : '#131313',
				'pastel-green' : '#77DD77',
				'error' : '#CF6679'
			},
			backgroundImage: {
				'logo': "url('/src/assets/images/Arcatro_logo_4.png')",
				'chuck-norris': "url('/src/assets/images/ChuckNorrisIpsum.png')",
				'dice1': "url('/src/assets/images/dice1.jpg')",
				'dice2': "url('/src/assets/images/dice2.jpg')",
				'dice3': "url('/src/assets/images/dice3.jpg')",
				'dice4': "url('/src/assets/images/dice4.jpg')",
				'dice5': "url('/src/assets/images/dice5.jpg')",
				'dice6': "url('/src/assets/images/dice6.jpg')",

			}
		},
  },
  plugins: [
		require('tw-elements/dist/plugin')
	],
}
