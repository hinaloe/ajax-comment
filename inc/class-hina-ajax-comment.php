<?php

/**
 * @module hina-ajax-comment
 */


class Hina_Ajax_Comment {

	private function __construct() {
		$this->add_actions();
		$this->load_textdomain();
	}

	public function add_actions() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'hina-ajax-comment', plugins_url( '/js/ajax-comments.js' , HINA_AJAX_COMMENT_MAIN_ENTRY ), array( 'jquery', 'wp-api' ), null/* @todo Version */, true );
		wp_localize_script( 'hina-ajax-comment', 'HinaACOptions', array(
			'req' => get_option( 'require_name_email' ),
			'CommentSaved' => __( 'Comment submitted.', 'hina-ajax-comment' ),
			'WaitingModeration' => __( '≪Your comment is awaiting moderation.≫', 'hina-ajax-comment' ),
		) );
	}

	public function load_textdomain() {
		load_plugin_textdomain( 'hina-ajax-comment' );
	}


	/**
	 * Plugin Activation Hook
	 */
	public static function activate() {

		// if not installed WP-API, not to activate.
		if ( ! defined( 'REST_API_VERSION' ) ) {
			deactivate_plugins( HINA_AJAX_COMMENT_MAIN_ENTRY );

			printf(
				/* translators: %s: 'WP-API' link */
				__( 'You have to install %s (Version 2) to use Ajax Comments!', 'hina-ajax-comment' ),
				sprintf( '<a href="%s">WP-API</a>',
					/* translators: WP-API on W.org plugin directory in your language */
					__( 'https://wordpress.org/plugins/rest-api/', 'hina-ajax-comment' )
				)
			);
		}

	}

	/**
	 * Init plugin
	 */
	public static function init() {
		new self;
	}
}

add_action( 'plugins_loaded', array( 'Hina_Ajax_Comment', 'init' ) );
