class TeacherRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getAll(skip = 0, take = undefined) {
        const [teachers, totalCount] = await Promise.all([
            this.prisma.teacher.findMany({
                skip: skip,
                take: take,
                include: {
                    subjects: true,
                }
            }),
            this.prisma.teacher.count(),
        ]);

        return {
            teachers,
            totalCount,
        };
    }

    async getById(id) {
        return await this.prisma.teacher.findUnique({
            where: { id },
        });
    }

    async create(name) {
        return await this.prisma.teacher.create({
            data: { name },
        });
    }

    async delete(id) {
        return await this.prisma.teacher.delete({
            where: { id },
        });
    }

    async update(id, name) {
        return await this.prisma.teacher.update({
            where: { id },
            data: { name },
        });
    }
}

export default TeacherRepository
