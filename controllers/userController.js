const userModel = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const bcrypt = require('bcrypt');

const getAllUsers = async (request, h) => {
  try {
    const users = await userModel.getAllUsers();
    return h.response(successResponse('Success', users)).code(200);
  } catch (err) {
    return h.response(errorResponse(err.message)).code(500);
  }
};

const createUser = async (request, h) => {
  try {
    const { username, email, password } = request.payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser(username, email, hashedPassword);
    return h.response(successResponse('User created', newUser)).code(201);
  } catch (err) {
    return h.response(errorResponse(err.message)).code(500);
  }
};

const loginUser = async (request, h) => {
  try {
    const { email, password } = request.payload;
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return h.response(errorResponse('User not found')).code(404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return h.response(errorResponse('Invalid password')).code(401);
    }

    return h.response(successResponse('Login successful', { id: user.id, username: user.username, email: user.email })).code(200);
  } catch (err) {
    return h.response(errorResponse(err.message)).code(500);
  }
};

const deleteUser = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedUser = await userModel.deleteUserById(id);

    if (deletedUser.affectedRows === 0) {
      return h.response(errorResponse('User not found')).code(404);
    }

    return h.response(successResponse('User deleted successfully')).code(200);
  } catch (err) {
    return h.response(errorResponse(err.message)).code(500);
  }
};

const createCheckin = async (request, h) => {
  try {
    const { Prediction } = request.payload;
    const newCheckin = await userModel.createCheckin(Prediction);
    return h.response(successResponse('Checkin created', newCheckin)).code(201);
  } catch (err) {
    return h.response(errorResponse(err.message)).code(500);
  }
};

module.exports = { getAllUsers, createUser, loginUser, deleteUser, createCheckin };
