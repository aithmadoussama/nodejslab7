import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Bibliothèque API",
    version: "1.0.0",
    description: "Documentation API REST"
  },

  servers: [
    {
      url: "http://localhost:3000/api/v1"
    }
  ],

  tags: [
    { name: "Auteurs" },
    { name: "Livres" },
    { name: "Emprunts" },
    { name: "Utilisateurs" }
  ],

  paths: {

    "/auteurs": {

      get: {
        tags: ["Auteurs"],
        summary: "Afficher les auteurs",

        responses: {
          200: {
            description: "Succès"
          }
        }
      },

      post: {
        tags: ["Auteurs"],
        summary: "Ajouter un auteur",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              example: {
                nom: "Hugo",
                prenom: "Victor",
                dateNaissance: "1802-02-26",
                biographie: "Auteur français"
              }
            }
          }
        },

        responses: {
          201: {
            description: "Auteur créé"
          }
        }
      }
    },

    "/livres": {

      get: {
        tags: ["Livres"],
        summary: "Afficher les livres",

        responses: {
          200: {
            description: "Succès"
          }
        }
      },

      post: {
        tags: ["Livres"],
        summary: "Ajouter un livre",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              example: {
                titre: "Les Misérables",
                auteur: "ID_AUTEUR",
                isbn: "978123456789",
                categorie: "Roman",
                anneeEdition: 1862
              }
            }
          }
        },

        responses: {
          201: {
            description: "Livre créé"
          }
        }
      }
    },

    "/emprunts": {

      get: {
        tags: ["Emprunts"],
        summary: "Afficher les emprunts",

        responses: {
          200: {
            description: "Succès"
          }
        }
      },

      post: {
        tags: ["Emprunts"],
        summary: "Créer un emprunt",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              example: {
                livre: "ID_LIVRE",
                lecteur: "Ali Benali",
                dateRetourPrevue: "2026-05-20"
              }
            }
          }
        },

        responses: {
          201: {
            description: "Emprunt créé"
          }
        }
      }
    },

    "/utilisateurs/register": {

      post: {
        tags: ["Utilisateurs"],
        summary: "Créer un utilisateur",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              example: {
                nom: "Admin",
                prenom: "Test",
                email: "admin@test.com",
                motDePasse: "123456",
                role: "admin"
              }
            }
          }
        },

        responses: {
          201: {
            description: "Utilisateur créé"
          }
        }
      }
    },

    "/utilisateurs/login": {

      post: {
        tags: ["Utilisateurs"],
        summary: "Connexion utilisateur",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              example: {
                email: "admin@test.com",
                motDePasse: "123456"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Connexion réussie"
          }
        }
      }
    }
  }
};

export const setupSwagger = (app: Express) => {

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};