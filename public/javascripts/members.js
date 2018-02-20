let selectedGroup = null;

document.querySelectorAll('#groups a').forEach(a => {

	a.addEventListener('click', event => {

		event.preventDefault();
		groupSelected(a.getAttribute('data-id'), a.getAttribute('data-name'));
	});
});

document.getElementById('save').addEventListener('click', () => {

	let users = [];

	document.querySelectorAll('#user_select option').forEach(option => option.selected && users.push(option.value));

	saveUsers(users)
});

function groupSelected(group_id, group_name){

	selectedGroup = group_id;
	document.getElementById('save').childNodes[0].nodeValue = group_name;

	fetch(`/users?gi=${group_id}`).then(response => response.json()).then(users => {

		document.querySelectorAll('#user_select option').forEach(option => {

			option.selected = users.includes(option.value);
		});
	})
}

function saveUsers(users){

	fetch(`/users`, {
		method: 'POST',
		body: JSON.stringify({
			usergroup: selectedGroup,
			users: users
		}),
		headers: {
			'content-type': 'application/json'
		},
	})
		.then(() => {

			window.location.reload();
		})
}