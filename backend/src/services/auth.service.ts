import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";
import { ConflictException, BadRequestException } from "../middlewares/http-exception.middleware.js";
import type { UserRepository } from "../repositories/user.repository.js";

export type PublicUser = Pick<User, "id" | "email" | "createdAt" | "updatedAt">;
const toPublicUser = ({ id, email, createdAt, updatedAt }: User): PublicUser => ({ id, email, createdAt, updatedAt });

const jwtSecret = () => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
    return process.env.JWT_SECRET;
};

export class AuthService {
    constructor(private readonly users: UserRepository) {}

    async register(email: string, password: string) {
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail || !password) throw new BadRequestException("Email and password are required");
        if (await this.users.findByEmail(normalizedEmail)) throw new ConflictException("Email already registered");
        const passwordHash = await bcrypt.hash(password, 12);
        return toPublicUser(await this.users.create({ email: normalizedEmail, passwordHash }));
    }

    async login(email: string, password: string) {
        const user = await this.users.findByEmail(email.trim().toLowerCase());
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new BadRequestException("Invalid credentials");
        const token = jwt.sign({}, jwtSecret(), { subject: user.id, expiresIn: process.env.JWT_EXPIRES_IN ?? "1d" });
        return { token, user: toPublicUser(user) };
    }

    async getMe(id: string) {
        const user = await this.users.findById(id);
        if (!user) throw new BadRequestException("User not found");
        return toPublicUser(user);
    }
}