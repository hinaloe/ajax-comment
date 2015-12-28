<?php

/**
 * @module hina-ajax-comment
 */


class Hina_Ajax_Comment {

	private function __construct() {
		$this->add_actions();
	}

	public function add_actions() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'hina-ajax-comment', plugins_url( '/js/ajax-comments.js' , HINA_AJAX_COMMENT_MAIN_ENTRY ), array( 'jquery', 'wp-api' ), null/* @todo Version */, true );
	}


	/**
	 * Plugin Activation Hook
	 */
	public static function activate() {

		// if not installed WP-API, not to activate.
		if ( ! defined( 'REST_API_VERSION' ) ) {
			deactivate_plugins( HINA_AJAX_COMMENT_MAIN_ENTRY );
			echo 'ajax comments を使用するには <a href="https://wordpress.org/plugins/rest-api/">WP-API</a> をインストール、有効化する必要があります。 ';
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
