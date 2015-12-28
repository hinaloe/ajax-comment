<?php
/*
Plugin Name: ajax Post Comment
Version: 0.1-alpha
Description: PLUGIN DESCRIPTION HERE
Author: YOUR NAME HERE
Author URI: YOUR SITE HERE
Plugin URI: PLUGIN SITE HERE
Text Domain: hina-ajax-comment
Domain Path: /languages
*/

define( 'HINA_AJAX_COMMENT_DIR', dirname( __FILE__ ) );
define( 'HINA_AJAX_COMMENT_MAIN_ENTRY', __FILE__ );


require_once( dirname( __FILE__ ) . '/inc/include.php' );

register_activation_hook( __FILE__, array( 'Hina_Ajax_Comment', 'activate' ) );
