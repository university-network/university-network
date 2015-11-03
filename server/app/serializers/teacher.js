function serializeTeacher(teacher) {
    return {
        id: teacher.id
    };
}

function serializeTeachers(teachers) {
    return teachers.map(function (teacher) {
        return serializeTeacher(teacher);
    });
}

module.exports = {
    serializeOne: serializeTeacher,
    serializeMany: serializeTeachers
};

