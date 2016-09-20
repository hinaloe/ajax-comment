=== ajax Post Comment ===
Contributors: hnle
Tags: ajax, rest-api, wp-api, comment, comments
Requires at least: 4.4
Tested up to: 4.6
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Post comment form on frontend tobe ajax using WP REST API Version.2

== Description ==

This plugin allow your site's comment form makes ajax -- non move/reload when user (including both subscriber,  normal viewer, and admins too) post comment!

Most themes supports this plugin, but if your theme's `class_form` have not `comment-form`, this plugin non supported.

And this plugin only can use for *Pure* WordPress Comment form.
so, its not able to be used with like Jetpack comment form and othere original/outside comment system/form.

**Feature**

- post comment with ajax
- Lite -- this plugin only using a little of jQuery feature to modify DOM, and very tiny js & PHP code.

**Require**

You have to install [WP REST API v2](https://wordpress.org/plugins/rest-api/) to use this plugin.


== Changelog ==

= 2016-09-20 =
- renew way to detect WP-API

= 2016-08-16 =
- Support hi-resolution icon. (for HiDPI screen: thats well known like as Retina)
- Show the message 'Your comment is awaiting moderation'. You can customize message with translate.

= 2016-08-15 =
Compatibility with last version of wp-api.js

= 0.1 =
* Init

