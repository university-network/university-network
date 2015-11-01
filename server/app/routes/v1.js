var express = require('express');
var app = express.Router();
var controllers = require('../controllers');

app.get('/api/v1/actions', controllers.actions.index);

app.get('/api/v1/articles', controllers.articles.index);

app.get('/api/v1/disciplines', controllers.disciplines.index);
app.post('/api/v1/disciplines', controllers.disciplines.create);
app.get('/api/v1/groups/:id/disciplines', controllers.disciplines.schedule);

app.get('/api/v1/groups', controllers.groups.index);

app.get('/api/v1/log_events', controllers.log_events.index);

app.get('/api/v1/materials', controllers.materials.index);

app.get('/api/v1/messages', controllers.messages.index);

app.get('/api/v1/student_answers', controllers.student_answers.index);

app.get('/api/v1/students', controllers.students.index);
app.post('/api/v1/students', controllers.students.create);
app.get('/api/v1/groups/:id/students', controllers.students.grouplist);

app.get('/api/v1/taught_disciplines', controllers.taught_disciplines.index);

app.get('/api/v1/teachers', controllers.teachers.index);
app.get('/api/v1/students/:id/teachers', controllers.teachers.myTeachers);

app.get('/api/v1/tests', controllers.tests.index);

app.get('/api/v1/test_questions', controllers.test_questions.index);

app.get('/api/v1/users', controllers.users.index);
app.post('/api/v1/users', controllers.users.create);

app.post('/api/v1/sessions', controllers.sessions.create);

module.exports = app;
