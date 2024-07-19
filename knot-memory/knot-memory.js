/** @typedef { import("./types.d.ts").Knot } Knot */
import Database from "better-sqlite3";
import { knots } from "./data.js";

const db = new Database(":memory:");

db.exec(`CREATE TABLE "knot"(
  "id" INTEGER,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "use" TEXT,
  "datetime" NUMERIC NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY("id")
);`);

const insert = db.prepare(`INSERT OR IGNORE INTO
  "knot"("name", "category", "use")
VALUES 
  (@name, @category, @use)`);

const insertMany = db.transaction((/** @type Knot[] */ knots) => {
  for (const knot of knots) {
    const { name, category, use } = knot;
    insert.run({ name, category, use });
  }
});

insertMany(knots);

const rows = /** @type Knot[] */ (db.prepare(`SELECT * FROM "knot"`).all());
console.log(rows);
