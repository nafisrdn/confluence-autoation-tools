const usersService = require("../services/users.service");

async function getAllUsers(req, res, next) {
  try {
    const users = await usersService.getAllUsers();

    let filteredUsers = users;
    if (req.query.active && req.query.active !== "no-filter") {
      const active = req.query.active > 0;
      filteredUsers = filteredUsers.filter((user) => user.active === active);
    }
    if (req.query.hasLoggedIn && req.query.hasLoggedIn !== "no-filter") {
      const hasLoggedIn = req.query.hasLoggedIn > 0;

      filteredUsers = filteredUsers.filter((user) => {
        if (hasLoggedIn) {
          return user.lastLogin.length > 0;
        } else {
          return user.lastLogin.length < 1;
        }
      });
    }

    res.json(filteredUsers);
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
}

module.exports = {
  getAllUsers,
};
