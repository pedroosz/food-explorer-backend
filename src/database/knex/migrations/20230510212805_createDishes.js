/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	knex.schema.createTable("dishes", (table) => {
		table.increments("id").primary();
		table.text("name").notNullable();
		table.text("image").notNullable();
		table.text("description").notNullable();
		table.float("price").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.integer("category_id").references("id").inTable("categories");
	});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("dishes");
