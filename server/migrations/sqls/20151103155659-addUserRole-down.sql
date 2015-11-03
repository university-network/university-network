ALTER TABLE users
ADD COLUMN access_level INT DEFAULT 1 NOT NULL;

UPDATE users
SET access_level = 2
WHERE role = 'teacher';

UPDATE users
SET access_level = 3
WHERE role = 'admin';

ALTER TABLE users
DROP COLUMN role;

DROP TYPE role;
