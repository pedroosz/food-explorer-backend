const fs = require("fs");
const AppError = require("../utils/AppError");

class UploadController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns
   */
  async getOne(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new AppError(400, "ID da imagem não fornecido");
    }

    try {
      const filePath = `src/uploads/${id}`;

      if (!fs.existsSync(filePath)) {
        throw new AppError(404, "Imagem não encontrada");
      }

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new AppError(404, "Imagem não encontrada");
      }

      throw new AppError(500, "Ocorreu um erro ao processar a solicitação");
    }
  }
}

module.exports = UploadController;
