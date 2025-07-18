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
	}
}
add_action( 'init', 'native_blocks_init' );
