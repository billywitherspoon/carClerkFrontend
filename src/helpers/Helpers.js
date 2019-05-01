class Helpers {
	constructor() {}

	isInteger = (value) => {
		let regex = /\D/;
		return value === '' ? false : !regex.test(value);
	};
}
