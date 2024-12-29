class PupilRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getAll(skip = 0, take = undefined) {
        const [pupils, totalCount] = await Promise.all([
            this.prisma.pupil.findMany({
                skip: skip,
                take: take,
                include: {
                    subject: {
                        include: {
                            teacher: true,
                        },
                    },
                }
            }),
            this.prisma.pupil.count(),
        ]);

        return {
            pupils,
            totalCount,
        };
    }

    async getById(id) {
        return await this.prisma.pupil.findUnique({
            where: { id },
        });
    }

    async create(name, grade, subjectId) {
        return await this.prisma.pupil.create({
            data: { name, grade: parseInt(grade, 10), subjectId },
            include: {
                subject: {
                    include: {
                        teacher: true,
                    },
                },
            },
        });
    }

    async delete(id) {
        return await this.prisma.pupil.delete({
            where: { id },
            include: {
                subject: {
                    include: {
                        teacher: true,
                    },
                },
            }
        });
    }

    async update(id, name, grade, subjectId) {
        return await this.prisma.pupil.update({
            where: { id },
            data: { name, grade: parseInt(grade, 10), subjectId },
            include: {
                subject: {
                    include: {
                        teacher: true,
                    },
                },
            }
        });
    }
}

export default PupilRepository
