import { PrismaClient } from "@prisma/client"
import { SubjectRepository, PupilRepository, TeacherRepository, AuthRepository } from "./repositories/index.js";
import { SubjectService, PupilService, TeacherService, AuthService } from "./services/index.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { adminCheckMiddleware } from "./middlewares/adminCheckMiddleware.js";

export const contextF = async ({ req }) => {
    const prisma = new PrismaClient();

    await authMiddleware({ req, prisma });

    // console.info(req.body.operationName)

    const isAuthOperation = ['Login', 'CreateUser', 'IntrospectionQuery'].includes(req.body.operationName);

    if (!isAuthOperation) {
        await adminCheckMiddleware({ req });
    }

    const teacherRepository = new TeacherRepository(prisma);
    const teacherService = new TeacherService(teacherRepository);

    const pupilRepository = new PupilRepository(prisma);
    const pupilService = new PupilService(pupilRepository);

    const subjectRepository = new SubjectRepository(prisma);
    const subjectService = new SubjectService(subjectRepository);

    const authRepository = new AuthRepository(prisma);
    const authService = new AuthService(authRepository)


    return {
        teacherService,
        pupilService,
        subjectService,
        authService,
    };
};