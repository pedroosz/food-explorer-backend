const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const connection = require("../database/knex");

class UserController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      throw new AppError(400, "Você precisa preencher todos os campos!");
    }

    await connection("users")
      .select("*")
      .where("email", email)
      .then(async ([user]) => {
        if (user) {
          throw new AppError(400, "Este email já está em uso.");
        }

        const passwordHash = await hash(password, 10);

        await connection("users")
          .insert({
            email,
            name,
            password: passwordHash,
          })
          .then(([createdUser]) => {
            if (!createdUser) {
              throw new AppError(501, "Erro ao criar usuário.");
            }

            return res.status(200).json({
              message: "Usuário cadastrado com sucesso",
            });
          });
      })
      .catch(() => {
        throw new AppError(501, "Erro ao criar usuário.");
      });
  }

  /**
   *
   * @param {import("express").Request} _req
   * @param {import("express").Response} _res
   */
  delete(req, res) {}

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {}

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async getOne(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      throw new AppError(404, "Usuário não encontrado.");
    }

    await connection("users")
      .select(["id", "name", "email", "created_at"])
      .where("id", Number(id))
      .then(async ([user]) => {
        if (user) {
          return res.status(200).json(user);
        }
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      });
  }
}

module.exports = UserController;
