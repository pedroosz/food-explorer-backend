const multer = require("multer");

module.exports = {
	upload: multer({
		dest: "src/uploads/",
		fileFilter: (req, file, cb) => {
			const FILE_TYPES = /jpeg|jpg|png/;

			if (!FILE_TYPES.test(file.mimetype)) {
				return cb(null, false);
			}

			return cb(null, true);
		},
	}),
};
