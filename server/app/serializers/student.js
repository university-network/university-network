function serializeStudent(student) {
    return {
        id: student.id,
        group: student.group
    };
}

function serializeStudents(students) {
    return students.map(function (student) {
        return serializeStudent(student);
    });
}

module.exports = {
    serializeOne: serializeStudent,
    serializeMany: serializeStudents
};
