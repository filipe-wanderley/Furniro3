import type { PrismaClient } from "@prisma/client";
import type { NewUser, UserRepository } from "./user.repository.js";

export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    findByEmail(email: string) { return this.prisma.user.findUnique({ where: { email } }); }
    findById(id: string) { return this.prisma.user.findUnique({ where: { id } }); }
    create(data: NewUser) { return this.prisma.user.create({ data }); }
}