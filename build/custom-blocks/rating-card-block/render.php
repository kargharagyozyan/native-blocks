<?php
// Get attributes
$content     = $attributes['content'] ?? '';
$text_color  = $attributes['textColor'] ?? '#000000';
$text_align  = $attributes['textAlign'] ?? 'left';
$font_family = $attributes['fontFamily'] ?? 'inherit';

$wrapper = get_block_wrapper_attributes([
	'style' => 'color: ' . esc_attr($text_color) . '; text-align: ' . esc_attr($text_align) . '; font-family: ' . esc_attr($font_family)
]);

echo '<p ' . $wrapper . '>' . wp_kses_post($content) . '</p>';
