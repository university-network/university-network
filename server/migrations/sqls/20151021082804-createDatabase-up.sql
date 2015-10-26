CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    access_level int NOT NULL,
    login VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE students
(
    id SERIAL PRIMARY KEY NOT NULL,
    group_id INT NOT NULL,
    user_id INT NOT NULL
);

CREATE TABLE teachers
(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL
);

CREATE TABLE groups
(
    id SERIAL PRIMARY KEY NOT NULL,
    cipher VARCHAR(16) NOT NULL,
    mentor_id INT NOT NULL
);

CREATE TABLE disciplines
(
    id SERIAL PRIMARY KEY NOT NULL,
    discipline_name VARCHAR(255) NOT NULL
);

CREATE TABLE taught_disciplines
(
    group_id INT NOT NULL,
    teacher_id INT NOT NULL,
    discipline_id INT NOT NULL
);

CREATE TABLE tests
(
    id SERIAL PRIMARY KEY NOT NULL,
    discipline_id INT NOT NULL,
    student_id INT NOT NULL
);

CREATE TABLE test_questions
(
    id SERIAL PRIMARY KEY NOT NULL,
    question TEXT NOT NULL,
    answer VARCHAR(255) NOT NULL
);

CREATE TABLE student_answers
(
    id SERIAL PRIMARY KEY NOT NULL,
    test_id INT NOT NULL,
    question_id INT NOT NULL,
    student_answer VARCHAR(255),
    correct bool
);

CREATE TABLE articles
(
    id SERIAL PRIMARY KEY NOT NULL,
    teacher_id INT NOT NULL,
    discipline_id INT NOT NULL,
    article TEXT NOT NULL
);

CREATE TABLE materials
(
    id SERIAL PRIMARY KEY NOT NULL,
    discipline_id INT NOT NULL,
    link VARCHAr(255) NOT NULL
);

CREATE TABLE messages
(
    id SERIAL PRIMARY KEY NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    sending_time TIMESTAMP NOT NULL
);

CREATE TABLE actions
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    access_level INT NOT NULL
);

CREATE TABLE log_events
(
    id SERIAL PRIMARY KEY NOT NULL,
    action_id INT NOT NULL,
    user_id INT NOT NULL,
    event_time TIMESTAMP NOT NULL
);
