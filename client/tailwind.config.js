module.exports = {
  content: [
		"./src/**/*.{js,jsx}",
		"./node_modules/tw-elements/dist/js/**/*.js"
	],
  theme: {
    extend: {
			/* EXAMPLES
			colors: {
				'dark-grey': '#363636'
			},
			backgroundImage: {
				'banner': "url('/src/assets/banner-background.jpg')"
			}
			*/
		},
  },
  plugins: [
		require('tw-elements/dist/plugin')
	],
}
