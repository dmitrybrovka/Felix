(() => {
	let
		notificationTimeout;

	document.addEventListener('DOMContentLoaded', () => {
		chrome.storage.sync.get([
			'api',
			'token',
			'expression',
			'url'
		], ({token = '', api = '', expression = '', url = ''}) => {
			tokenField.value = token;
			urlField.value = url;
			apiField.value = api;
			expressionField.value = expression;
		});
	});

	optionsForm.addEventListener('submit', (e) => {
		clearTimeout(notificationTimeout);

		if (apiField && tokenField) {
			saveBtn.disabled = true;

			chrome.storage.sync.set({
				api: apiField.value,
				url: urlField.value,
				token: tokenField.value,
				expression: expressionField.value
			}, () => {
				setTimeout(() => {
					notification.classList.add('options__notification_show_true');
					saveBtn.disabled = false;

					notificationTimeout = setTimeout(() => {
						notification.classList.remove('options__notification_show_true');
					}, 800);

				}, 1000);
			});
		}

		e.preventDefault();
	});
})();
