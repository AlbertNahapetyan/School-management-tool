const resolver = {
    Query: {
        pupils: async (_, { skip, take }, { pupilService }) => {
            return await pupilService.getPupils(skip, take);
        },
        pupil: async (_, { id }, { pupilService }) => {
            return await pupilService.getPupil(id);
        },
    },
    Mutation: {
        createPupil: async (_, { name, grade, subjectId }, { pupilService }) => {
            return await pupilService.createPupil(name, grade, subjectId);
        },
        deletePupil: async (_, { id }, { pupilService }) => {
            return await pupilService.deletePupil(id);
        },
        updatePupil: async (_, { id, name, grade, subjectId }, { pupilService }) => {
            return await pupilService.updatePupil(id, name, grade, subjectId);
        },
    },
};

export default resolver