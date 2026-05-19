import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Utilisateur from "../models/Utilisateur";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Accès refusé : token manquant"
    });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = await Utilisateur.findById(decoded.id);

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token invalide"
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Vous n'avez pas la permission"
      });
    }

    next();
  };
};