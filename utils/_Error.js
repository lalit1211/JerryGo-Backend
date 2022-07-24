class _Error extends Error {
	constructor(message, statuscode) {
		super(message);
		this.message = message;
		this.statuscode = statuscode;
		this.status = `${statuscode}`.startsWith(4)
			? "fail"
			: "error";
	}
}

module.exports = _Error;
