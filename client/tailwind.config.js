module.exports = {
  content: [
		"./src/**/*.{js,jsx}",
		"./node_modules/tw-elements/dist/js/**/*.js"
	],
  theme: {
    extend: {
			colors: {
				'color-1' : '#EF3054',
				'color-2' : '28502E',
				'color-3' : 'F4AC45',
			},
			backgroundImage: {
				'banner': "url('/src/assets/banner-background.jpg')"
			}
		},
  },
  plugins: [
		require('tw-elements/dist/plugin')
	],
}
