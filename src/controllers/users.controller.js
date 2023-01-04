const usersService = require("../services/users.service");

async function getAllUsers(req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
}

module.exports = {
  getAllUsers,
};
