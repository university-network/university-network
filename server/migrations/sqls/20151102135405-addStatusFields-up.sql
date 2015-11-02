ALTER TABLE users
ADD status status DEFAULT 'unarchived' NOT NULL;

ALTER TABLE teachers
ADD status status DEFAULT 'unarchived' NOT NULL;

ALTER TABLE articles
ADD status status DEFAULT 'unarchived' NOT NULL;

ALTER TABLE disciplines
ADD status status DEFAULT 'unarchived' NOT NULL;

ALTER TABLE materials
ADD status status DEFAULT 'unarchived' NOT NULL;

ALTER TABLE students
ADD status status DEFAULT 'unarchived' NOT NULL;

ALTER TABLE taught_disciplines
ADD status status DEFAULT 'unarchived' NOT NULL;

ALTER TABLE groups
ADD status status DEFAULT 'unarchived' NOT NULL;
