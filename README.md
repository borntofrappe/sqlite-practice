# sqlite-practice

Practice with SQL and SQLite specifically with your new favorite data set.

## pokemon-pinball.db

```sql
.tables
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
