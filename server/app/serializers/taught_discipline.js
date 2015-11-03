function serializeTaughtDiscipline(taught_discipline) {
    return {
        discipline: taught_discipline.discipline,
        group: taught_discipline.group,
        teacher: taught_discipline.teacher
    };
}

function serializeTaughtDisciplines(taught_disciplines) {
    return taught_disciplines.map(function (taught_discipline) {
        return serializeTaughtDiscipline(taught_discipline);
    });
}

module.exports = {
    serializeOne: serializeTaughtDiscipline,
    serializeMany: serializeTaughtDisciplines
};

