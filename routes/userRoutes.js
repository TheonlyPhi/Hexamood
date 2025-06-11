const userController = require('../controllers/userController');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: userController.getAllUsers,
  },
  {
    method: 'POST',
    path: '/users',
    handler: userController.createUser,
  },
  {
    method: 'POST',
    path: '/login',
    handler: userController.loginUser,
  },
  {
    method: 'GET',
    path: '/login',
    handler: () => {
      return { status: 'success', message: 'Login endpoint is active.' };
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: userController.deleteUser,
  },
  {
    method: 'POST',
    path: '/checkin',
    handler: userController.createCheckin,
  }
];
