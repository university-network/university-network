var _ = require('lodash');

function serializeStudent(student) {
    if (!student || !_.isObject(student)) {
        return null;
    }

    return {
        id: student.id,
        name: student.name
    };
}

function serializeStudents(students) {
    if (!students || !_.isFunction(students.map)) {
        return null;
    }

    return students.map(function (student) {
        return serializeStudent(student);
    });
}

module.exports = {
    serializeOne: serializeStudent,
    serializeMany: serializeStudents
};
