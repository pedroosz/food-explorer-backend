const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const auth = require("../configs/auth");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function ensureAuth(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new AppError(401, "Token não recebido.");
	}

	const [_, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(token, auth.jwt.secret);

		req.user = {
			id: Number(user_id),
		};

		next();
	} catch (err) {
		throw new AppError(401, "Token inválido");
	}
}

module.exports = ensureAuth;
