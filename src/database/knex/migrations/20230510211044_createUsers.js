/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.text("name").notNullable();
		table.text("email").unique();
		table.text("password").notNullable();
		table.boolean("admin").defaultTo(false);
		table.timestamp("created_at").defaultTo(knex.fn.now());
	});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("users");
