const AppError = require("../utils/AppError");
const auth = require("../configs/auth");
const connection = require("../database/knex");
const { verify } = require("jsonwebtoken");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function ensureAdmin(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new AppError(401, "Token não recebido.");
	}

	const [_, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(token, auth.jwt.secret);

		const user = await connection("users")
			.select("*")
			.where("id", Number(user_id))
			.first();

		if (!user) {
			throw new AppError(401, "Token inválido.");
		}

		if (user.admin == false) {
			throw new AppError(401, "Sem permissão.");
		}

		req.user = {
			id: Number(user_id),
		};
	} catch (err) {
		throw new AppError(500, err.message);
	}

	next();
}

module.exports = ensureAdmin;
