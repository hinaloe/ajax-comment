/*!
 * Hina ajax Comment 0.0.1-alpha-20160816
 */
/* global HinaACOptions */
/// <reference path="../../typings/tsd.d.ts" />
/* global wp */
/* global jQuery */

declare var HinaACOptions: any;


jQuery(function($) {
	'use strict';
	
	/**
	 * ajax action visitor
	 * 
	 * @param {JQueryEventObject} e
	 * @param {JQuery} $form
	 * @return {JQueryPromise<WPApi.CommentResponse>} jqXHR or Error -- jquery promise obj
	 */
	const requestPostCommentGuest = (e: JQueryEventObject, $form: JQuery): JQueryPromise<WPApi.CommentResponse>=> {
		const name: string = $form.find('input[name=author]').val();
		const email: string = $form.find('input[name=email]').val();
		const url: string = $form.find('input[name=url]').val();
		const comment: string = $form.find('textarea[name=comment]').val();
		const post: number = $form.find('input[name=comment_post_ID]').val();
		const parent: number = $form.find('input[name=comment_parent]').val();

		const IsRequireEmailName: boolean = !!+HinaACOptions.req;

		if (IsRequireEmailName && (!name.length || !email.length || !comment.length)) {
			return $.Deferred().reject({ error: "Invalid input", statusText: 'Name, email, and comment content are required.' }, 'Name, email, and comment content are required.');
		} else if (!IsRequireEmailName && (!comment.length)) {
			return $.Deferred().reject({ error: "Invalid input", statusText: 'Comment content is required.' }, 'Comment content is required.');
		}

		const data: WPApi.Comment = {
			author_email: email,
			author_name: name,
			author_url: url,
			content: comment,
			post: post,
			parent: parent
		};

		const Comment: WP_API.models.Comment = new wp.api.models.Comment(data);

		return Comment.save();
	}
	

	/**
	 * ajax action logged-in user
	 * 
	 * @param {JQueryEventObject} e Event
	 * @param {JQuery} $form FormObj
	 * @return {JQueryPromise<WPApi.CommentResponse>}
	 */
	const requestPostCommentLoggedInUser = (e: JQueryEventObject, $form: JQuery): JQueryPromise<WPApi.CommentResponse> => {

		const comment: string = $form.find('textarea[name=comment]').val();
		const post: number = $form.find('input[name=comment_post_ID]').val();
		const parent: number = $form.find('input[name=comment_parent]').val();

		if (!comment.length) {
			return $.Deferred().reject({ error: "Invalid input", statusText: 'Comment content is required.' }, 'Comment content is required.');
		}

		const data: WPApi.Comment = {
			content: comment,
			post: post,
			parent: parent,
			status: "approved"
		};
		const Comment: WP_API.models.Comment = new wp.api.models.Comment(data);

		return Comment.save();
	}


	$('body').on('submit', '.comment-form', (e) => {

		e.preventDefault();
		const form = e.target;
		const $form = $(form);

		const isLoggedIn = $form.parents('body').hasClass('logged-in');

		const $formSubmit = $form.find('.form-submit');

		const xhr: JQueryPromise<WPApi.CommentResponse> = isLoggedIn ? requestPostCommentLoggedInUser(e, $form) : requestPostCommentGuest(e, $form);

		let $status = $form.find('.form-msg i');
		if ($status.length === 0) {
			$status = $("<div class=form-msg id=hac-mess><i/></div>").insertBefore($formSubmit).find('i');
		}
		$status.text('Submitting...')
		$form.find(':input').prop('disabled', true);
		xhr.then(function(res) {
			let html: string = '<ol class="comment-list">' +
				'<li id="comment-' + res.id + '" class="comment even thread-even depth-1">' +
				'<article id="div-comment-' + res.id + '" class="comment-body">' +
				'<footer class="comment-meta">' +
				'<div class="comment-author vcard">' +
				'<img src="' + res.author_avatar_urls["48"] + '" srcset="' + res.author_avatar_urls["96"]  + ' 2x" class="avatar photo avatar-default" />' +
				'<b>' + res.author_name + '</b>' +
				'</div><!-- .comment-author -->' +
				'</footer><!-- .comment-meta -->';
			if(res.status === 'hold') {
				html += `<div class="comment-status">${HinaACOptions.WaitingModeration}</div>`;
			}
			html += '<div class="comment-content">' + res.content.rendered + '</div><!-- .comment-content -->' +
				'</article><!-- .comment-body -->' +
				'</li><!-- #comment-## -->' +
				'</ol><!-- .comment-list -->';


			$form.html(html);
			$("#reply-title").text(HinaACOptions.CommentSaved);
			console.log(res);
			return res;
		}).fail(function(jqXHR: JQueryXHR, textStatus: string) {
			console.error(jqXHR);
			const err:string = jqXHR.responseJSON && jqXHR.responseJSON.message ? jqXHR.responseJSON.message : jqXHR.statusText;
			$status.text('Error!: ' + err);
			$form.find(':input').prop('disabled', false);

		});




		return false;
	});

	$('form.comment-form').removeAttr('novalidate');

});
