const connection = require("../database/knex");
const AppError = require("../utils/AppError");

class CategoryController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const { name } = req.body;

    const categoryWithSameName = await connection("categories")
      .select("*")
      .where({ name })
      .first();

    if (categoryWithSameName) {
      throw new AppError(400, "Esta categoria já existe.");
    }

    const createdCategory = await connection("categories").insert({ name });

    if (!createdCategory) {
      throw new AppError(500, "Erro ao criar categoria.");
    }

    return res.json(createdCategory);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async find(req, res) {
    const { id } = req.params;

    const categoryWithSameId = await connection("categories")
      .select("*")
      .where({ id: Number(id) })
      .first();

    if (!categoryWithSameId) {
      throw new AppError(404, "Esta categoria não existe.");
    }

    return res.status(200).json(categoryWithSameId);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async list(req, res) {
    const availableCategories = await connection("categories").select("*");

    return res.json(availableCategories);
  }
}

module.exports = CategoryController;
