import { generateToken } from "../utils/jwt.js";
import { compare, hash } from "../utils/password.js";
import { ADMIN_SECRET } from "../config/env.js";

class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async createUser(input, secretKey) {
        const role = secretKey === ADMIN_SECRET ? 'admin' : 'user'

        const hashedPassword = await hash(input.password)

        return await this.authRepository.createUser({
            username: input.username,
            password: hashedPassword,
            role,
        });
    }

    async login(username, password) {
        const user = await this.authRepository.findUserByUsername(username);
        if (!user) throw new Error('No such user found');

        const valid = await compare(password, user.password)
        if (!valid) throw new Error('Invalid password');

        const token = generateToken({ userId: user.id })
        return { token, user };
    }
}

export default AuthService
