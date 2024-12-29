class SubjectService {
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    async getSubject(id) {
        return this.subjectRepository.getById(id)
    }

    async getSubjects(skip, take) {
        return this.subjectRepository.getAll(skip, take);
    }

    async createSubject(name, teacherId) {
        return this.subjectRepository.create(name, teacherId);
    }

    async deleteSubject(id) {
        return this.subjectRepository.delete(id);
    }

    async updateSubject(id, name, teacherId) {
        return this.subjectRepository.update(id, name, teacherId);
    }
}

export default SubjectService
