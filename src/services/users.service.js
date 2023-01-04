const axios = require("axios");
const {
  CONFLUENCE_API_URL,
  CONFLUENCE_API_TOKEN,
} = require("../configs/confluence.config");

async function getAllUsers() {
  const res = await axios.post(
    `${CONFLUENCE_API_URL}/rest/confluenceuserexport/1.0/search`,
    {
      searchString: "",
      activeUsers: true,
      inActiveUsers: true,
      pageSize: 20,
      offset: 280,
    },
    {
      headers: {
        Authorization: `Bearer ${CONFLUENCE_API_TOKEN}`,
      },
    }
  );

  return res.data;
}

module.exports = {
  getAllUsers,
};
