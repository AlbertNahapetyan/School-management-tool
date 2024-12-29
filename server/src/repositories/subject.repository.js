class SubjectRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getAll(skip = 0, take = undefined) {
        const [subjects, totalCount] = await Promise.all([
            this.prisma.subject.findMany({
                skip: skip,
                take: take,
                include: {
                    teacher: true,
                }
            }),
            this.prisma.subject.count(),
        ]);

        return {
            subjects,
            totalCount,
        };
    }

    async getById(id) {
        return await this.prisma.subject.findUnique({
            where: { id },
        });
    }

    async create(name, teacherId) {
        return await this.prisma.subject.create({
            data: { name, teacherId },
            include: {
                teacher: true,
            },
        });
    }

    async delete(id) {
        return await this.prisma.subject.delete({
            where: { id },
            include: {
                teacher: true
            }
        });
    }

    async update(id, name, teacherId) {
        return await this.prisma.subject.update({
            where: { id },
            data: { name, teacherId },
        });
    }
}

export default SubjectRepository
