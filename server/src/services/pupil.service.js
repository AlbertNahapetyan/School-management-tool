class PupilService {
    constructor(pupilRepository) {
        this.pupilRepository = pupilRepository;
    }

    async getPupil(id) {
        return this.pupilRepository.getById(id)
    }

    async getPupils(skip, take) {
        return this.pupilRepository.getAll(skip, take);
    }

    async createPupil(name, grade, subjectId) {
        return this.pupilRepository.create(name, grade, subjectId);
    }

    async deletePupil(id) {
        return this.pupilRepository.delete(id);
    }

    async updatePupil(id, name, grade, subjectId) {
        return this.pupilRepository.update(id, name, grade, subjectId);
    }
}

export default PupilService
