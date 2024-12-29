const resolver = {
    Mutation: {
        createUser: async (_, { input, secretKey }, { authService }) => {
            return await authService.createUser(input, secretKey);
        },

        login: async (_, { username, password }, { authService }) => {
            return await authService.login(username, password);
        },
    },
}

export default resolver;