/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
	knex.schema.hasTable("categories").then(async (exists) => {
		if (!exists) {
			await knex.schema.createTable("categories", (table) => {
				table.increments("id").primary();

				table.text("name").notNullable();
			});

			console.log("Created categories table");
		}
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("categories");
