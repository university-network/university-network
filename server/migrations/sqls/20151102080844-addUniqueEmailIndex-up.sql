CREATE UNIQUE INDEX unique_users_email_idx
ON users (LOWER(email));
