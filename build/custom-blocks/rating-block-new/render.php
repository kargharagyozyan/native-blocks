<?php
$content = $attributes['content'] ?? 'Hello World';

$wrapper = get_block_wrapper_attributes();

echo '<p ' . $wrapper . '>' . wp_kses_post($content) . '</p>';
