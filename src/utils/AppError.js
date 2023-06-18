class AppError {
	message;
	status;

	constructor(status = 400, message) {
		this.message = message;
		this.status = status;
	}
}

module.exports = AppError;
