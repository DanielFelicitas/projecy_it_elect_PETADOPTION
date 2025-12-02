import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Adoption API",
      version: "1.0.0",
      description: "Full API documentation for the Pet Adoption backend.",
    },

    servers: [{ url: "http://localhost:3000" }],

    components: {
      schemas: {
        Pet: {
          type: "object",
          properties: {
            name: { type: "string" },
            species: { type: "string" },
            age: { type: "number" },
            breed: { type: "string" },
            status: { type: "string", default: "Available" },
          },
          required: ["name", "species"],
        },

        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
          },
          required: ["name", "email"],
        },

        Adoption: {
          type: "object",
          properties: {
            petId: { type: "string" },
            userId: { type: "string" },
            status: { type: "string", default: "Pending" },
          },
          required: ["petId", "userId"],
        },
      },
    },

    paths: {
      // ========== PET ROUTES ========== //
      "/api/v1/pets": {
        get: {
          summary: "Get all pets",
          tags: ["Pets"],
          responses: {
            200: {
              description: "List of pets",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/Pet" } }
                }
              }
            }
          }
        },

        post: {
          summary: "Create a new pet",
          tags: ["Pets"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Pet" }
              }
            }
          },
          responses: {
            201: {
              description: "Pet created",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Pet" } }
              }
            }
          }
        }
      },

      "/api/v1/pets/{id}": {
        get: {
          summary: "Get a pet by ID",
          tags: ["Pets"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: {
              description: "Pet found",
              content: { "application/json": { schema: { $ref: "#/components/schemas/Pet" } } }
            },
            404: { description: "Pet not found" }
          }
        },

        put: {
          summary: "Update a pet",
          tags: ["Pets"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          requestBody: {
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Pet" } }
            }
          },
          responses: {
            200: { description: "Pet updated" },
            404: { description: "Pet not found" }
          }
        },

        delete: {
          summary: "Delete a pet",
          tags: ["Pets"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            200: { description: "Pet deleted" },
            404: { description: "Pet not found" }
          }
        }
      },

      // ========== USER ROUTES ========== //
      "/api/v1/users": {
        get: {
          summary: "Get all users",
          tags: ["Users"],
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/User" } }
                }
              }
            }
          }
        },

        post: {
          summary: "Create a user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } }
            }
          },
          responses: {
            201: {
              description: "User created",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/User" } }
              }
            }
          }
        }
      },

      "/api/v1/users/{id}/adoptions": {
        get: {
          summary: "Get all adoptions made by a specific user",
          tags: ["Users"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            200: {
              description: "User adoptions",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/Adoption" } }
                }
              }
            }
          }
        }
      },

      // ========== ADOPTION ROUTES ========== //
      "/api/v1/adoptions": {
        get: {
          summary: "Get all adoptions",
          tags: ["Adoptions"],
          responses: {
            200: {
              description: "List of adoptions",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/Adoption" } }
                }
              }
            }
          }
        },

        post: {
          summary: "Create an adoption record",
          tags: ["Adoptions"],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Adoption" } }
            }
          },
          responses: {
            201: {
              description: "Adoption created",
              content: { "application/json": { schema: { $ref: "#/components/schemas/Adoption" } } }
            }
          }
        }
      },

      "/api/v1/adoptions/{id}": {
        put: {
          summary: "Update adoption status",
          tags: ["Adoptions"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          requestBody: {
            content: { "application/json": { schema: { $ref: "#/components/schemas/Adoption" } } }
          },
          responses: {
            200: { description: "Adoption updated" },
            404: { description: "Adoption not found" }
          }
        }
      }
    }
  },

  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
