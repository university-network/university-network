function serializeDiscipline(discipline) {
    return {
        id: discipline.id,
        name: discipline.name
    };
}

function serializeDisciplines(disciplines) {
    return disciplines.map(function (discipline) {
        return serializeDiscipline(discipline);
    });
}

module.exports = {
    serializeOne: serializeDiscipline,
    serializeMany: serializeDisciplines
};


