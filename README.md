# sqlite-practice

Practice with SQL and SQLite specifically with your new favorite data set.

## pokemon-pinball

```bash
sqlite3 pokemon-pinball.sqlite3
```

### pokemon

| column | type    | options     |
| ------ | ------- | ----------- |
| id     | INTEGER | PRIMARY KEY |
| no     | TEXT    |             |
| name   | TEXT    |             |

### area

| column | type    | options     |
| ------ | ------- | ----------- |
| id     | INTEGER | PRIMARY KEY |
| name   | TEXT    |             |

### version

| column | type    | options     |
| ------ | ------- | ----------- |
| id     | INTEGER | PRIMARY KEY |
| name   | TEXT    |             |

### location

| column     | type    | options                     |
| ---------- | ------- | --------------------------- |
| pokemon_id | INTEGER | FOREIGN KEY "pokemon"("id") |
| area_id    | INTEGER | FOREIGN KEY "area"("id")    |
| version_id | INTEGER | FOREIGN KEY "version"("id") |

### evolution

| column               | type    | options                     |
| -------------------- | ------- | --------------------------- |
| pokemon_evolution_id | INTEGER | FOREIGN KEY "pokemon"("id") |
| pokemon_base_id      | INTEGER | FOREIGN KEY "pokemon"("id") |

### dex_location

| column  | view            |
| ------- | --------------- |
| pokemon | pokemon("name") |
| area    | area("name")    |
| version | version("name") |

### dex_evolution

| column    | view            |
| --------- | --------------- |
| evolution | pokemon("name") |
| base      | pokemon("name") |

## knot-memory

### knot

| column   | type    | options                            |
| -------- | ------- | ---------------------------------- |
| id       | INTEGER | PRIMARY KEY                        |
| name     | TEXT    | NOT NULL                           |
| category | TEXT    | NOT NULL                           |
| use      | TEXT    |                                    |
| datetime | NUMERIC | NOT NULL DEFAULT CURRENT_TIMESTAMP |

### Command line

```bash
sqlite3
```

```sql
.read knot-memory.sql
```

```sql
SELECT * FROM "knot";
```

```sql
INSERT INTO
  "knot"("name", "category")
VALUES
  ('Good luck knot', 'decorative');

INSERT INTO
  "knot"("name", "category", "use")
VALUES
  ('Water knot', 'bend', 'To join webbing for climbing');

SELECT * FROM "knot";
```
