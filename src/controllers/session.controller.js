const bcrypt = require("bcryptjs");
const connection = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const jwt = require("jsonwebtoken");

class SessionController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const { email, password } = req.body;

    const user = await connection("users").where({ email }).first();

    if (!user) {
      throw new AppError(401, "Email e/ou senha incorreta");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError(401, "Email e/ou senha incorreta");
    }

    const { expire, secret } = authConfig.jwt;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        admin: user.admin ? true : false,
      },
      secret,
      {
        subject: String(user.id),
        expiresIn: expire,
      }
    );

    return res.json({ user, token });
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async verify(req, res) {
    const [, token] = req.headers.authorization.split(" ");

    try {
      jwt.verify(token, authConfig.jwt.secret, (err, payload) => {
        if (err) {
          throw new AppError(401, "Erro ao processar token.");
        }
        return res
          .status(200)
          .json({
            email: payload.email,
            id: payload.id,
            admin: payload.admin,
            token,
          });
      });
    } catch (err) {
      throw new AppError(401, "Token inválido");
    }
  }
}

module.exports = SessionController;
