(function($, w, d) {

	function callAction(action, params, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			var response;
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					response = JSON.parse(xmlhttp.responseText);
				} else {
					try {
						response = JSON.parse(xmlhttp.responseText);
					} catch (e) {
						response = { error: { statusText: xmlhttp.statusText, responseText: xmlhttp.responseText } };
					}
				}
				callback(response);
			}
		};

		var method = (params.httpMethod || 'POST').toUpperCase();
		var url = '/api/' + action;

		if (method === 'GET') {
			for (var param in params) {
				if (~['action', 'httpMethod'].indexOf(param)) continue;
				url += '&' + param + '=' + params[param];
			}
		}

		xmlhttp.open(method, url, true);
		xmlhttp.setRequestHeader('Content-Type', 'application/json');
		xmlhttp.send(JSON.stringify(params));
	}

	function showMessage(message, type) {

	}

	function formatFeed(item) {
		var html = '<form class="form-horizontal" data-action="news.feed.update">';
		// id
		html += '  <input type="hidden" name="id" value="' + item.id + '">';
		// url
		html += '<div class="form-group">';
		html += '<label class="col-sm-2 control-label">Url</label>';
		html += ' <div class="col-sm-10">';
		html += '  <input type="url" readonly=readonly class="form-control" placeholder="Url" value="' + item.url + '">';
		html += ' </div>';
		html += '</div>';
		// title
		html += '<div class="form-group">';
		html += '<label class="col-sm-2 control-label">Title</label>';
		html += ' <div class="col-sm-10">';
		html += '  <input type="text" name="title" class="form-control" placeholder="Title" value="' + item.title.replace(/"/g, '') + '">';
		html += ' </div>';
		html += '</div>';
		// culture:
		html += '<div class="form-group">';
		html += '<label class="col-sm-2 control-label">Country, lang</label>';
		// country
		html += ' <div class="col-sm-5">';
		html += '  <input type="text" name="country" class="form-control" placeholder="Country" maxlength=2 value="' + item.country + '">';
		html += ' </div>';
		// language
		html += ' <div class="col-sm-5">';
		html += '  <input type="text" name="lang" class="form-control" placeholder="Language" maxlength=2 value="' + item.lang + '">';
		html += ' </div>';

		html += '</div>';
		// status
		html += '<div class="form-group">';
		html += '<label class="col-sm-2 control-label">Status</label>';
		html += ' <div class="col-sm-10">';
		html += '  <input type="text" name="status" class="form-control" placeholder="Status" value="' + item.status + '">';
		html += ' </div>';
		html += '</div>';
		if (item.itemReadedAt) {
			// itemReadedAt
			html += '<div class="form-group">';
			html += '<label class="col-sm-2 control-label">itemReadedAt</label>';
			html += ' <div class="col-sm-10">';
			html += '  <input type="text" readonly=readonly class="form-control" value="' + item.itemReadedAt + '">';
			html += ' </div>';
			html += '</div>';
		}
		if (item.readErrorAt) {
			// readErrorAt
			html += '<div class="form-group">';
			html += '<label class="col-sm-2 control-label">Last Error</label>';
			html += ' <div class="col-sm-5">';
			html += '  <input type="text" readonly=readonly class="form-control" value="' + item.readErrorAt + '">';
			html += ' </div>';
			// readError
			html += ' <div class="col-sm-5">';
			html += '  <input type="text" readonly=readonly class="form-control" value="' + item.readError + '">';
			html += ' </div>';
			html += '</div>';
		}


		// buttons
		html += '<div class="form-group">';
		html += '  <div class="col-sm-offset-2 col-sm-10">';
		html += '    <button type="submit" class="btn btn-primary">Save</button>';
		// if (item.status === 'inactive') {
		// 	html += '    <button type="button" class="btn btn-danger action-button" data-action="news.feed.delete">Delete</button>';
		// }
		html += '  </div>';
		html += '</div>';
		html += '</form>';

		return html;
	}

	function formatModel(model, item) {
		switch (model) {
			case 'feed':
				return formatFeed(item);
		}
	}

	function executeQueryForm(el) {
		el = $(el);

		var action = el.attr('data-action');
		var target = $('#' + el.attr('data-target'));
		var model = el.attr('data-model');
		var params = JSON.parse(el.find('textarea').val());

		console.log(action, target, model, params);

		callAction(action, params, function(data) {
			target.html('');
			for (var i = 0; i < data.length; i++) {
				var html = '<li class="list-group-item">' + formatModel(model, data[i]) + '</li>';
				target.append(html);
			}
		});
	}

	function actionButtonClicked() {
		var btn = $(this);
		var action = btn.attr('data-action');
		var form = btn.closest('form');

		var params = {};
		form.find('input,select').each(function() {
			var el = $(this);
			var name = el.attr('name');
			if (name) {
				params[name] = el.val();
			}
		});

		callAction(action, params, function(result) {
			if (result.error) {
				showMessage(result.error, 'error');
			} else {
				showMessage('Success!');
			}
		});
	}

	function submitForm() {
		var form = $(this);

		var action = form.attr('data-action');
		if (!action) {
			console.log('form no action');
		}

		var params = {};
		form.find('input,select').each(function() {
			var el = $(this);
			var name = el.attr('name');
			if (name) {
				params[name] = el.val();
			}
		});

		callAction(action, params, function(result) {
			console.log('result', result);
		});

		return false;
	}

	$(w).ready(function() {
		// refresh lists
		$('.query-form').each(function() {
			executeQueryForm(this);
		});
		// refresh lists on click
		$('.query-button').click(function() {
			var form = $(this).closest('.query-form');
			executeQueryForm(form);
		});

		$(d).on('click', '.action-button', actionButtonClicked);

		$(d).on('submit', 'form', submitForm);

		$('#news-feed-create input[name="websiteHost"]').typeahead({
				minLength: 3,
				highlight: true,
				async: true
			}, {
				display: 'host',
				source: function(q, sunc, callback) {
					console.log('q', q);
					callAction('news.websites.list', {
						where: {
							host: {
								$regex: q
							}
						}
					}, function(result) {
						console.log('result', result);
						callback(result);
					});
				}
			})
			.bind('typeahead:select', function(ev, suggestion) {
				var form = $(this).closest('form');
				form.find('input[name="websiteId"]').val(suggestion.id);
				form.find('input[name="country"]').val(suggestion.country);
				form.find('input[name="lang"]').val(suggestion.lang);
			});
	});

})(jQuery, window, document);
