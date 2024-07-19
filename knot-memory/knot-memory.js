import Database from "better-sqlite3";
import http from "http";
import { knots } from "./data.js";
const PORT = 1234;

/** @typedef { import("./types.d.ts").Knot } Knot */

// db setup
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

// app setup
const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    if (method === "GET") {
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.write(markup());
      res.end();
    } else if (method === "POST") {
      let data = [];
      req
        .on("data", (chunk) => {
          data.push(chunk);
        })
        .on("end", () => {
          const requestString = Buffer.concat(data).toString("utf-8");
          const [, name, category, use] = requestString.match(
            /name=(.+)&category=(.+)&use=(.+)?/i
          );
          const statement = db.prepare(`INSERT INTO
            "knot"("name", "category", "use")
          VALUES
            (@name, @category, @use)`);
          statement.run({ name, category, use });

          res.writeHead(302, {
            Location: "/",
          });
          res.end();
        });
    }
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.write("<h1>Page not found</h1>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const markup = () => {
  const rows = /** @type Knot[] */ (db.prepare(`SELECT * FROM "knot"`).all());
  const items = [...rows].sort((a, b) =>
    b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1
  );

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>knot-memory</title>
    <style>
      body {
        font-family: system-ui;
      }
    </style>
  </head>
  <body>
    <h1>Knot memory</h1>

    <h2>Add knot</h2>
    <form method="POST">
      <div>
        <label for="name">Name</label>
        <input required type="text" id="name" name="name" />
      </div>
      <div>
        <label for="category">Category</label>
        <input required type="text" id="category" name="category" />
      </div>

      <div>
        <label for="use">Use</label>
        <textarea id="use" name="use"></textarea>
      </div>

      <button>Submit</button>
    </form>

    <h2>Current knots</h2>
    <ul>
    ${[...items]
      .map(
        (knot) => `
        <li>
          <h3>${knot.name}</h3>
          <dl>
            <dt>Category</dt>
            <dd>${knot.category}</dd>
            ${knot.use ? `<dt>Use</dt><dd>${knot.use}</dd>` : ""}
          </dl>
          ${
            knot.datetime
              ? `<p>Tied <time>${new Date(
                  knot.datetime
                ).toDateString()}</time></p>`
              : ""
          }
        </li>
      `
      )
      .join("")}
    </ul>
  </body>
</html>`;
};
