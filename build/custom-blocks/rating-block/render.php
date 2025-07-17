<?php
$content = $attributes['content'] ?? '';

$wrapper = get_block_wrapper_attributes();

echo '<p ' . $wrapper . '>' . wp_kses_post($content) . '</p>';
