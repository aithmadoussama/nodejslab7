import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import v1Routes from "./routes/v1";
import { setupSwagger } from "./utils/swagger";

const app = express();

/* ======================================================
   SWAGGER
====================================================== */

setupSwagger(app);

/* ======================================================
   MIDDLEWARES GLOBAUX
====================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

/* ======================================================
   LIMITATION DES REQUÊTES
====================================================== */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de requêtes envoyées. Veuillez patienter quelques minutes."
  }
});

app.use(limiter);

/* ======================================================
   ROUTE PRINCIPALE
====================================================== */

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    application: "Bibliothèque REST API",
    version: "1.0.0",
    status: "Serveur opérationnel",
    documentation: "/api-docs",
    endpoints: {
      auteurs: "/api/v1/auteurs",
      livres: "/api/v1/livres",
      emprunts: "/api/v1/emprunts",
      utilisateurs: "/api/v1/utilisateurs"
    }
  });
});

/* ======================================================
   ROUTES API
====================================================== */

app.use("/api/v1", v1Routes);

/* ======================================================
   ROUTE INTROUVABLE
====================================================== */

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route introuvable",
    requestedUrl: req.originalUrl
  });
});

/* ======================================================
   GESTION GLOBALE DES ERREURS
====================================================== */

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("Erreur serveur :", err);

    res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Erreur interne du serveur"
          : err.message
    });
  }
);

export default app;