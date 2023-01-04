const axios = require("axios");
const {
  CONFLUENCE_API_URL,
  CONFLUENCE_API_TOKEN,
} = require("../configs/confluence.config");

async function getAllUsers() {
  let users = [];
  let offset = 0;
  let pageSize = 20;
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await axios.post(
      `${CONFLUENCE_API_URL}/rest/confluenceuserexport/1.0/search`,
      {
        searchString: "",
        activeUsers: true,
        inActiveUsers: true,
        pageSize: pageSize,
        offset: offset,
      },
      {
        headers: {
          Authorization: `Bearer ${CONFLUENCE_API_TOKEN}`,
        },
      }
    );

    const data = res.data;

    users.push(data.users);
    hasNextPage = data.hasNextPage;
    offset += pageSize;
  }

  return users;
}

module.exports = {
  getAllUsers,
};
