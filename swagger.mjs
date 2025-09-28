// swagger.mjs  (ESM)
import swaggerAutogen from 'swagger-autogen';

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Proyecto Express API',
    description: 'Documentación generada automáticamente con swagger-autogen',
    version: '1.0.0',
  },
  servers: [{ url: 'http://62.169.28.169' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      RegisterInput: {
        type: 'object',
        required: ['usuario', 'contrasena'],
        properties: {
          usuario: { type: 'string', example: 'dani@test.com' },
          contrasena: { type: 'string', example: '12345678' },
          admin: { type: 'boolean', example: false },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['usuario', 'contrasena'],
        properties: {
          usuario: { type: 'string' },
          contrasena: { type: 'string' },
        },
      },
    },
  },
  // Si tienes auth por Bearer para ciertas rutas:
  // security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './app.js',
  './auth/routes.js',
  './Routes/peliculaRoutes.js',
];

const generate = swaggerAutogen({ openapi: '3.0.0' });
generate(outputFile, endpointsFiles, doc);
