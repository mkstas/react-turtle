async function postData(url, data) {
	try {
		const response = await fetch('http://api.turtle' + url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

export { postData }
