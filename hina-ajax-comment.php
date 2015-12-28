<?php
/*
Plugin Name: ajax Post Comment
Version: 0.1-alpha
Description: Post comment form on frontend tobe ajax using WP REST API Version.2
Author: Hinaloe
Author URI: https://hinaloe.net/
Plugin URI: https://hinaloe.net/portfolio/ajax-comment
Text Domain: hina-ajax-comment
Domain Path: /languages
*/

define( 'HINA_AJAX_COMMENT_DIR', dirname( __FILE__ ) );
define( 'HINA_AJAX_COMMENT_MAIN_ENTRY', __FILE__ );


require_once( dirname( __FILE__ ) . '/inc/include.php' );

register_activation_hook( __FILE__, array( 'Hina_Ajax_Comment', 'activate' ) );
