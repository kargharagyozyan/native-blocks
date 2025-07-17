<?php
/**
 * Plugin Name:       Native Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       native-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function native_blocks_init() {
	// Register each block folder inside build/custom-blocks/
	$manifest_path = __DIR__ . '/build/blocks-manifest.php';

	if ( file_exists( $manifest_path ) ) {
		$manifest_data = require $manifest_path;

		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( __DIR__ . "/build/custom-blocks/{$block_type}" );
		}
	} else {
		register_block_type( __DIR__ . '/build/custom-blocks/rating-block' );
		register_block_type( __DIR__ . '/build/custom-blocks/review-card-block' );
		register_block_type( __DIR__ . '/build/custom-blocks/rating-block-new' );
	}
}
add_action( 'init', 'native_blocks_init' );

function native_blocks_enqueue_editor_assets() {
	$gutenberg_js_path = __DIR__ . '/build/gutenberg/index.js';
	if ( file_exists( $gutenberg_js_path ) ) {
		wp_enqueue_script(
			'native-blocks-gutenberg',
			plugins_url( 'build/gutenberg/index.js', __FILE__ ),
			[ 'wp-blocks', 'wp-element', 'wp-editor' ], // Adjust dependencies as needed
			filemtime( $gutenberg_js_path ),
			true
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'native_blocks_enqueue_editor_assets' );
