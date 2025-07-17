const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,

	entry: {
		// Gutenberg scripts
		'gutenberg/index': path.resolve(__dirname, 'src/gutenberg/index.js'),

		// Custom Gutenberg blocks
		'custom-blocks/rating-block/index': path.resolve(__dirname, 'src/custom-blocks/rating-block/index.js'),
		'custom-blocks/rating-block-new/index': path.resolve(__dirname, 'src/custom-blocks/rating-block-new/index.js'),
		'custom-blocks/rating-card-block/index': path.resolve(__dirname, 'src/custom-blocks/rating-card-block/index.js'),
	},

	// Output configuration
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		clean: true,
	},
};
