ALTER TABLE messages
DROP CONSTRAINT fk_sender_id;

ALTER TABLE messages
DROP CONSTRAINT fk_receiver_id;

ALTER TABLE students
DROP CONSTRAINT fk_students_user;

ALTER TABLE students
DROP CONSTRAINT fk_student_group;

ALTER TABLE teachers
DROP CONSTRAINT fk_teachers_user;

ALTER TABLE groups
DROP CONSTRAINT fk_group_mentor;

ALTER TABLE articles
DROP CONSTRAINT fk_article_teacher;

ALTER TABLE articles
DROP CONSTRAINT fk_article_discipline;

ALTER TABLE taught_disciplines
DROP CONSTRAINT fk_discipline_teacher;

ALTER TABLE taught_disciplines
DROP CONSTRAINT fk_discipline;

ALTER TABLE taught_disciplines
DROP CONSTRAINT fk_group;

