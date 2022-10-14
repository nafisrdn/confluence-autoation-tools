const axios = require("axios");

const { API_URL, API_TOKEN } = require("./config/confluence-api");

const getUsers = async (start = 0, limit = 200) => {
  try {
    const res = await axios.get(
      `${API_URL}/group/confluence-users/member?start=${start}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const users = res.data.results;

    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUsers;
