import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import AuthController from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { PrismaUserRepository } from "../repositories/prisma.user.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const prisma = new PrismaClient();
const controller = new AuthController(
  new AuthService(new PrismaUserRepository(prisma)),
);
export const authRoutes = Router();
authRoutes.post("/register", controller.register);
authRoutes.post("/login", controller.login);
authRoutes.get("/me", authMiddleware, controller.me);
