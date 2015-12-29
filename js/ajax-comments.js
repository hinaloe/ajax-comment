/* global HinaACOptions */
/// <reference path="../../rest-api/wp-api.js" />
/// <reference path="../typings/tsd.d.ts" />
/* global wp */
/* global jQuery */


jQuery(function ($) {
	'use strict';
	/**
	 * 
	 * @return {JQueryXHR}
	 */
	var requestPostCommentGuest = function (e, $form) {
		var name = $form.find('input[name=author]').val();
		var email = $form.find('input[name=email]').val();
		var url = $form.find('input[name=url]').val();
		var comment = $form.find('textarea[name=comment]').val();
		var post = $form.find('input[name=comment_post_ID]').val();
		var parent = $form.find('input[name=comment_parent]').val();

		var IsRequireEmailName = Boolean(+HinaACOptions.req);

		if( IsRequireEmailName && ( ! name.length || ! email.length || ! comment.length ) ) {
			return $.Deferred().reject({error:"Invalid input" , statusText: 'Name, email, and comment content are required.'},'Name, email, and comment content are required.');
		} else if ( ! IsRequireEmailName && ( ! comment.length ) ) {
			return $.Deferred().reject({error:"Invalid input", statusText: 'Comment content is required.'}, 'Comment content is required.');
		}

		var data = {
			author_email: email,
			author_name: name,
			author_url: url,
			content: comment,
			post: post,
			parent: parent
		};




		return jQuery.ajax(wp.api.models.Comment.prototype.urlRoot,
			{
				data: JSON.stringify(data),
				method: 'post',
				contentType: 'application/json',
				dataType: 'json'
			})
	}
	

	/**
	 * @param {JQueryEventObject} e Event
	 * @param {JQuery} $form FormObj
	 * @return {JQueryXHR}
	 */
	var requestPostCommentLoggedInUser = function (e, /** @type JQuery */ $form) {

		var comment = $form.find('textarea[name=comment]').val();
		var post = $form.find('input[name=comment_post_ID]').val();
		var parent = $form.find('input[name=comment_parent]').val();
		
		if ( ! comment.length ) {
			return $.Deferred().reject({error:"Invalid input", statusText: 'Comment content is required.'}, 'Comment content is required.');
		}

		var data = {
			content: comment,
			post: post,
			parent: parent,
			status: "approved"
		};
		var Comment = new wp.api.models.Comment(data);
		/** @type {JQueryXHR} jqxhr */
		return Comment.save();
	}


	$('body').on('submit', '.comment-form', function (e) {

		e.preventDefault();
		var form = e.target;
		var $form = $(form);

		var isLoggedIn = $form.parents('body').hasClass('logged-in');

		var $formSubmit = $form.find('.form-submit');

			



		var xhr = isLoggedIn ? requestPostCommentLoggedInUser(e, $form) : requestPostCommentGuest(e, $form);

		var $status = $formSubmit.find('i');
		if( $status.length === 0 ) {
			$status = $formSubmit.prepend('<i />').find('i');
		}
		$status.text( 'Submitting...' )
		$form.find(':input').prop('disabled',true);
		xhr.then(function (res) {
			var html = '<ol class="comment-list">' +
				'<li id="comment-' + res.id + '" class="comment even thread-even depth-1">' +
				'<article id="div-comment-' + res.id + '" class="comment-body">' +
				'<footer class="comment-meta">' +
				'<div class="comment-author vcard">' +
				'<img src="' + res.author_avatar_urls["48"] + '" class="avatar photo avatar-default" />' +
				'<b>' + res.author_name + '</b>' +
				'</div><!-- .comment-author -->' +
				'</footer><!-- .comment-meta -->' +
				'<div class="comment-content">' + res.content.rendered + '</div><!-- .comment-content -->' +
				'</article><!-- .comment-body -->' +
				'</li><!-- #comment-## -->' +
				'</ol><!-- .comment-list -->';


			$form.html(html);
			$("#reply-title").text(HinaACOptions.CommentSaved);
			// $formSubmit.html("Finished");//
			console.log(res);
		}).fail(function (jqXHR, textStatus) {
			//
			console.error(jqXHR);
			var err = jqXHR.responseJSON && jqXHR.responseJSON.message ? jqXHR.responseJSON&&jqXHR.responseJSON.message : jqXHR.statusText;
			$status.text('Error! :' + err );
			$form.find(':input').prop('disabled',false);

		});




		return false;
	});
	
	$( 'form.comment-form' ).removeAttr('novalidate');

});
