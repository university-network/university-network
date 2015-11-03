function serializeGroup(group) {
    return {
        id: group.id,
        cipher: group.cipher,
        mentor: group.mentor
    };
}

function serializeGroups(groups) {
    return groups.map(function (group) {
        return serializeGroup(group);
    });
}

module.exports = {
    serializeOne: serializeGroup,
    serializeMany: serializeGroups
};
