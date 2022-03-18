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
				'error' : '#CF6679'
			},
			backgroundImage: {
				'chuck-norris': "url('/src/assets/images/ChuckNorrisIpsum.png')"
			}
		},
  },
  plugins: [
		require('tw-elements/dist/plugin')
	],
}
