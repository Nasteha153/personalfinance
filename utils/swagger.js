import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description:
        "API for managing users, authentication, transactions, categories and finance summaries.",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? process.env.MONGO_URI_PROD
            : "http://localhost:5000",
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
    },

    tags: [
      {
        name: "Auth",
      },
      {
        name: "Transactions",
      },
      {
        name: "Upload",
      },
      {
        name: "Admin",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
