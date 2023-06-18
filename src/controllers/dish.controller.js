const AppError = require("../utils/AppError");
const connection = require("../database/knex");
const { existsSync, unlinkSync } = require("fs");

class DishController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const { name, price, description, category, ingredients } = req.body;
    const image = req.file;

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !ingredients ||
      !image
    ) {
      throw new AppError(400, "Você precisa preencher todos os campos!");
    }

    const dish = await connection("dishes")
      .select("*")
      .where("name", name)
      .first();

    if (dish) {
      throw new AppError(401, "Um prato com este nome já existe.");
    }

    const categoryData = await connection("categories")
      .select("*")
      .where("id", Number(category))
      .first();

    if (!categoryData) {
      throw new AppError(401, "Esta categoria não existe.");
    }

    const [dish_id] = await connection("dishes").insert({
      name,
      price,
      description,
      category_id: categoryData.id,
      image: image.filename,
    });

    const ingredientsMap = ingredients.map((ingredient) => ({
      dish_id,
      name: ingredient,
    }));

    await connection("ingredients").insert(ingredientsMap);

    return res.status(200).json({
      message: "Prato criado com sucesso.",
    });
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async delete(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      throw new AppError(404, "Este prato não existe");
    }

    const targetDish = await connection("dishes")
      .select("*")
      .where("id", Number(id))
      .first();

    if (!targetDish) {
      throw new AppError(404, "Prato inexistente.");
    }

    try {
      await connection("dishes")
        .delete()
        .where("id", Number(id))
        .then((deletedRows) => {
          if (deletedRows) {
            res.status(200).json({
              message: "Prato excluído com sucesso.",
            });
          }
        });
    } catch (err) {
      throw new AppError(500, "Erro ao excluir prato.");
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      ingredients: newIngredients,
      category_id,
    } = req.body;

    const newImage = req.file;

    const targetDish = await connection("dishes")
      .select("*")
      .where({ id: Number(id) })
      .first();

    if (!targetDish) {
      throw new AppError(404, "Prato não encontrado.");
    }

    if (newImage) {
      const oldImagePath = `src/uploads/${targetDish.image}`;
      const oldImageExists = existsSync(oldImagePath);

      if (oldImageExists) {
        unlinkSync(oldImagePath);
      }
    }

    const oldIngredients = await connection("ingredients")
      .select("*")
      .where({ dish_id: Number(id) });

    await Promise.all(
      oldIngredients
        .filter((x) => !newIngredients.includes(x.name))
        .map(async (x) => {
          await connection("ingredients").delete().where({ id: x.id });
        })
    );

    await Promise.all(
      newIngredients
        .filter(
          (x) =>
            !oldIngredients.find(
              (y) => y.name.toLowerCase() === x.toLowerCase()
            )
        )
        .map(async (x) => {
          await connection("ingredients").insert({
            name: x,
            dish_id: targetDish.id,
          });
        })
    );

    try {
      const updateData = {
        name: name || targetDish.name,
        price: Number(price) || targetDish.price,
        description: description || targetDish.description,
        category_id: Number(category_id) || targetDish.category_id,
        image: newImage?.filename || targetDish.image,
      };

      const updatedRows = await connection("dishes")
        .update(updateData)
        .where({ id: Number(id) });

      if (updatedRows) {
        const oldCategoryDishes = await connection("dishes")
          .select("*")
          .where({ category_id: Number(targetDish.category_id) });

        if (oldCategoryDishes.length === 0) {
          await connection("categories")
            .delete("*")
            .where({ id: Number(targetDish.category_id) });
        }

        return res
          .status(200)
          .json({ message: "Informações do prato atualizadas." });
      }
    } catch (err) {
      console.log(err);
      throw new AppError(500, "Erro ao atualizar prato.");
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async getOne(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      throw new AppError(404, "Prato não encontrado.");
    }

    const dish = await connection("dishes")
      .select("*")
      .where("id", Number(id))
      .first();

    if (!dish) {
      return res.status(404).json({ message: "Prato não encontrado!" });
    }

    const ingredients = await connection("ingredients")
      .select()
      .where("dish_id", Number(dish.id))
      .orderBy("name");

    const response = {
      ...dish,
      ingredients,
    };

    return res.status(200).json(response);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async getAll(req, res) {
    const { search } = req.query;

    if (search) {
      const dishesWithTitle = await connection("dishes")
        .select("*")
        .whereLike("name", `%${search}%`);

      return res.status(200).json(dishesWithTitle);
    }

    const dishList = await connection("dishes").select("*");

    return res.status(200).json(dishList);
  }
}

module.exports = DishController;
