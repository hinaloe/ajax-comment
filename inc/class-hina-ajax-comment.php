<?php

/**
 * @module hina-ajax-comment
 */


class Hina_Ajax_Comment {

	/**
	 * Hina_Ajax_Comment constructor.
	 */
	private function __construct() {
		$this->add_actions();
		$this->load_textdomain();
	}

	/**
	 * Add actions
	 */
	public function add_actions() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_notices', array( $this, 'admin_notices' ) );
		add_filter( 'rest_allow_anonymous_comments', '__return_true' );
	}

	/**
	 * Enqueue front scripts
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'hina-ajax-comment', plugins_url( '/js/ajax-comments.js' , HINA_AJAX_COMMENT_MAIN_ENTRY ), array( 'jquery', 'wp-api' ), null/* @todo Version */, true );
		wp_localize_script( 'hina-ajax-comment', 'HinaACOptions', array(
			'req' => get_option( 'require_name_email' ),
			'CommentSaved' => esc_html__( 'Comment submitted.', 'hina-ajax-comment' ),
			'WaitingModeration' => esc_html__( '≪Your comment is awaiting moderation.≫', 'hina-ajax-comment' ),
		) );
	}

	/**
	 * Setup l10n
	 */
	public function load_textdomain() {
		load_plugin_textdomain( 'hina-ajax-comment' );
	}

	/**
	 * Admin notices
	 */
	public function admin_notices() {
		if ( $msg = static::detect_api() ) {
			printf( '<div class="error"><p>%s</p></div>', $msg );
		}
	}

	/**
	 * Plugin Activation Hook
	 */
	public static function activate() {

		// If not installed WP-API, not to activate.
		if ( $msg = static::detect_api() ) {
			deactivate_plugins( HINA_AJAX_COMMENT_MAIN_ENTRY );

			trigger_error( $msg, E_USER_ERROR );
		}

	}

	/**
	 * Check is WP-REST-API activated
	 *
	 * @return bool|string return message when activated, not return false
	 */
	public static function detect_api() {
		if ( ! defined( 'REST_API_VERSION' ) || ! class_exists( 'WP_REST_Comments_Controller' ) ) {
			return sprintf(
				/* translators: %s: 'WP-API' link */
				esc_html__( 'You have to install %s (Version 2) to use Ajax Comments!', 'hina-ajax-comment' ),
				sprintf( '<a href="%s">WP-API</a>',
					/* translators: WP-API on W.org plugin directory in your language */
					esc_url( __( 'https://wordpress.org/plugins/rest-api/', 'hina-ajax-comment' ) )
				)
			);
		}
		return false;

	}

	/**
	 * Init plugin
	 */
	public static function init() {
		new self;
	}
}

add_action( 'plugins_loaded', array( 'Hina_Ajax_Comment', 'init' ) );
