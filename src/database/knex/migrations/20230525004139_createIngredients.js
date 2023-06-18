/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
	knex.schema.hasTable("ingredients").then(async (exists) => {
		if (!exists) {
			await knex.schema.createTable("ingredients", (table) => {
				table.increments("id").primary();

				table.text("name").notNullable();

				table
					.integer("dish_id")
					.references("id")
					.inTable("dishes")
					.onDelete("CASCADE");
			});

			console.log("Created ingredients table");
		}
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("ingredients");
