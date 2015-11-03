CREATE TYPE role  AS ENUM ('student', 'teacher', 'admin');

ALTER TABLE users
ADD COLUMN role role DEFAULT 'student' NOT NULL;

UPDATE users
SET role = 'teacher'
WHERE access_level = 2;

UPDATE users
SET role = 'admin'
WHERE access_level = 3;

ALTER TABLE users
DROP COLUMN access_level;
