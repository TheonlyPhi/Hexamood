const Hapi = require('@hapi/hapi');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5500,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Root endpoint
  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      status: 'success',
      message: 'Welcome to Hapi.js + MySQL API!',
    }),
  });

  // Register user routes
  server.route(userRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  // Log available routes
  server.table().forEach((route) => {
    console.log(`${route.method.toUpperCase()} ${route.path}`);
  });
};

init();
