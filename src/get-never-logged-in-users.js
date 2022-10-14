process.setMaxListeners(0);

const fs = require("fs/promises");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const getUsers = require("./get-users");
const loginMiddleware = require("./middleware/login-middleware");

const saveToFile = async (haveLoggedInUsers, neverLoggedInUsers) => {
  const path = "../data/get-never-logged-in-users";

  let haveLoggedInUsersStr = "";
  let neverLoggedInUsersStr = "";

  for (const user of haveLoggedInUsers) {
    haveLoggedInUsersStr += user + "\n";
  }

  for (const user of neverLoggedInUsers) {
    neverLoggedInUsersStr += user + "\n";
  }

  try {
    fs.writeFile(`${path}/have-logged-in-users.txt`, haveLoggedInUsersStr);
    fs.writeFile(`${path}/never-logged-in-users.txt`, neverLoggedInUsersStr);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  let result = {
    haveLoggedInUsers: [],
    neverLoggedInUsers: [],
  };

  const users = await getUsers(211, 11);
  console.log(users.length);

  let count = 0;

  for (const user of users) {
    console.log(count + ": " + user.username);
    const url = `https://confluence.pegadaian.co.id/admin/users/viewuser.action?username=${user.username}`;

    try {
      const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().addArguments("--headless"))
        .build();

      await driver.get(url);

      await loginMiddleware(driver, By);

      try {
        await driver.findElement(By.id("login-meta-lastsuccessfulogindate"));

        result.haveLoggedInUsers.push(user.username);
      } catch (error) {
        if (error.name === "NoSuchElementError") {
          result.neverLoggedInUsers.push(user.username);
        } else {
          console.log("=====o=====");
          console.log(error);
          console.log("=====o=====");
        }
      }

      console.log(result);
      driver.close();
    } catch (error) {
      console.log("=====o=====");
      console.log(error);
      console.log("=====o=====");
    }

    count++;
  }

  console.log("a");

  await saveToFile(result.haveLoggedInUsers, result.neverLoggedInUsers);
})();
