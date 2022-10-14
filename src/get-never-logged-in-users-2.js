const XLSX = require("xlsx");

const workbook = XLSX.readFile("../input/get-never-logged-in-users-2.xlsx");

(async () => {
  const sheets = workbook.Sheets[workbook.SheetNames[0]];
  const users = XLSX.utils.sheet_to_json(sheets);

  for (const user of users) {
    if (user["Last login"].length > 1) {
    //   console.log(user['Full name']);
    // console.log(user['Username']);
    console.log(user['Email']);
    }
  }
})();
