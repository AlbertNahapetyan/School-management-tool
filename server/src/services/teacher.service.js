class TeacherService {
    constructor(teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    async getTeacher(id) {
        return this.teacherRepository.getById(id)
    }

    async getTeachers(skip, take) {
        return this.teacherRepository.getAll(skip, take);
    }

    async createTeacher(name) {
        return this.teacherRepository.create(name);
    }

    async deleteTeacher(id) {
        return this.teacherRepository.delete(id);
    }

    async updateTeacher(id, name) {
        return this.teacherRepository.update(id, name);
    }
}

export default TeacherService