ALTER TABLE messages
ADD CONSTRAINT fk_sender_id
FOREIGN KEY (sender_id)
REFERENCES users (id);

ALTER TABLE messages
ADD CONSTRAINT fk_receiver_id
FOREIGN KEY (receiver_id)
REFERENCES users (id);

ALTER TABLE students
ADD CONSTRAINT fk_students_user
FOREIGN KEY (user_id)
REFERENCES users (id);

ALTER TABLE students
ADD CONSTRAINT fk_student_group
FOREIGN KEY (group_id)
REFERENCES groups (id);

ALTER TABLE teachers
ADD CONSTRAINT fk_teachers_user
FOREIGN KEY (user_id)
REFERENCES users (id);

ALTER TABLE groups
ADD CONSTRAINT fk_group_mentor
FOREIGN KEY (mentor_id)
REFERENCES teachers (id);

ALTER TABLE articles
ADD CONSTRAINT fk_article_teacher
FOREIGN KEY (teacher_id)
REFERENCES teachers (id);

ALTER TABLE articles
ADD CONSTRAINT fk_article_discipline
FOREIGN KEY (discipline_id)
REFERENCES disciplines (id);

ALTER TABLE taught_disciplines
ADD CONSTRAINT fk_discipline_teacher
FOREIGN KEY (teacher_id)
REFERENCES teachers (id);

ALTER TABLE taught_disciplines
ADD CONSTRAINT fk_discipline
FOREIGN KEY (discipline_id)
REFERENCES disciplines (id);

ALTER TABLE taught_disciplines
ADD CONSTRAINT fk_group
FOREIGN KEY (group_id)
REFERENCES groups (id);
