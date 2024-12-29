import { config } from "dotenv";
config();

const getEnvVar = (key, required = true) => {
    if (!Object.prototype.hasOwnProperty.call(process.env, key) && required) {
        throw new Error(`${key} does not exist on process.env`)
    }

    return process.env[key]
}

export const PORT = getEnvVar("PORT", false) ?? 3000
export const JWT_SECRET = getEnvVar('JWT_SECRET')
export const ADMIN_SECRET = getEnvVar('ADMIN_SECRET')