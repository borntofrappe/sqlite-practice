CREATE TABLE IF NOT EXISTS "knot"(
  "id" INTEGER,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "use" TEXT,
  "datetime" NUMERIC NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY("id")
);

INSERT OR IGNORE INTO
  "knot"("id", "name", "category", "use")
VALUES
  (1, 'Ashley''s stopper knot', 'stopper', NULL),
  (2, 'Bowline', 'loop', 'Making a fixed loop in the end of a line'),
  (3, 'Cleat hitch', 'hitch', NULL),
  (4, 'Clove hitch', 'hitch', 'Securing lines running along a series of posts'),
  (5, 'Double fisherman''s knot', 'bend', 'Joining thin'),
  (6, 'Half hitch', 'hitch', 'As part of other knots'),
  (7, 'Prusik', 'hitch', 'Climbing'),
  (8, 'Sheet bend', 'bend', 'Joining two ropes of different diameters'),
  (9, 'Square knot', 'binding', 'Joining two ends of a single line to bind around an object');