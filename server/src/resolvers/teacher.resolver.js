const resolver = {
    Query: {
        teachers: async (_, { skip = 0, take = 10 }, { teacherService }) => {
            return await teacherService.getTeachers(skip, take);
        },
        teacher: async (_, { id }, { teacherService }) => {
            return await teacherService.getTeacher(id);
        },
    },
    Mutation: {
        createTeacher: async (_, { name }, { teacherService }) => {
            return await teacherService.createTeacher(name);
        },
        deleteTeacher: async (_, { id }, { teacherService }) => {
            return await teacherService.deleteTeacher(id);
        },
        updateTeacher: async (_, { id, name }, { teacherService }) => {
            return await teacherService.updateTeacher(id, name);
        },
    },
};

export default resolver;
