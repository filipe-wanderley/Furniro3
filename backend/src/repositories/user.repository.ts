import type { User } from "@prisma/client";

export type NewUser = Pick<User, "email" | "passwordHash">;

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: NewUser): Promise<User>;
}