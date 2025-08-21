import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `Event-Ease API docs`,
      version: `1.0.0`,
      description: `API documentation for Event-Ease backend`,
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "Rambo123@gmail.com" },
            password: { type: "string", example: "Passw0rd123" },
          },
        },
        Register: {
          type: "object",
          required: ["email", "password", "name"],
          properties: {
            name: { type: "string", example: "Rambo" },
            email: { type: "string", example: "Rambo123@gmail.com" },
            password: { type: "string", example: "Passw0rd123" },
          },
        },
        EventPartial: {
          type: "object",
          properties: {
            title: { type: "string", example: "Updated Tech Conference" },
            description: { type: "string", example: "Updated description" },
            location: { type: "string", example: "Mumbai" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-12-02T10:00:00Z",
            },
          },
        },
        Event: {
          type: "object",
          required: ["title", "location", "date"],
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Tech Conference 2025" },
            description: {
              type: "string",
              example: "A conference about new tech trends",
            },
            location: { type: "string", example: "New Delhi" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-12-01T10:00:00Z",
            },
            userId: { type: "integer", example: 5 },
          },
        },
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "secret123" },
          },
        },
        UserPartial: {
          type: "object",
          properties: {
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", example: "jane@example.com" },
            password: { type: "string", example: "newsecret" },
          },
        },
      },
    },
  },
  apis: [`./src/routes/*.js`],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
