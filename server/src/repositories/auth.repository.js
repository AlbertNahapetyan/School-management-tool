class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async createUser(data) {
        return await this.prisma.user.create({
            data,
        });
    }

    async findUserByUsername(username) {
        return await this.prisma.user.findUnique({
            where: { username },
        });
    }
}

export default AuthRepository
