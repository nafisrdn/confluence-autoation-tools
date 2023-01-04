const usersService = require("../services/users.service");

async function getAllUsers(req, res, next) {
  try {
    const users = await usersService.getAllUsers();

    if (req.query.active) {
      const active = req.query.active > 0;
      const filteredUsers = filterUserByActive(users, active);

      res.json(filteredUsers);
    }

    res.json(users);
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
}

function filterUserByActive(users, active) {
  return users.filter((user) => user.active === active);
}

module.exports = {
  getAllUsers,
};
