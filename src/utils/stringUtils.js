export const toTitleCase = (str) => {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

export const spaceToDashAndLowerCase = (str) => {
	return str
		.trim()
		.replace(
			/\s+/g,
			function (txt) {
				return '-';
			}
		)
		.toLowerCase();
}