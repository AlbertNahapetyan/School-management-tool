const resolver = {
    Query: {
        subjects: async (_, { skip, take }, { subjectService }) => {
            return await subjectService.getSubjects(skip, take);
        },
        subject: async (_, { id }, { subjectService }) => {
            return await subjectService.getSubject(id);
        },
    },
    Mutation: {
        createSubject: async (_, { name, teacherId }, { subjectService }) => {
            return await subjectService.createSubject(name, teacherId);
        },
        deleteSubject: async (_, { id }, { subjectService }) => {
            return await subjectService.deleteSubject(id);
        },
        updateSubject: async (_, { id, name, teacherId }, { subjectService }) => {
            return await subjectService.updateSubject(id, name, teacherId);
        },
    },
};

export default resolver