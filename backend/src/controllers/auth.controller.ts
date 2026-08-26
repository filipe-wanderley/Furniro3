import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export default class AuthController {
  constructor(private readonly auth: AuthService) {}
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as {
        email?: string;
        password?: string;
      };
      res
        .status(201)
        .json(await this.auth.register(email ?? "", password ?? ""));
    } catch (error) {
      next(error);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as {
        email?: string;
        password?: string;
      };
      res.status(200).json(await this.auth.login(email ?? "", password ?? ""));
    } catch (error) {
      next(error);
    }
  };
  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await this.auth.getMe(req.userId ?? ""));
    } catch (error) {
      next(error);
    }
  };
}
