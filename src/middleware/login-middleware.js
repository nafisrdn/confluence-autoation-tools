const { USERNAME, PASSWORD } = require("../config/confluence-api");

const loginMiddleware = async (driver, By) => {
  let pageTitle = await driver.getTitle();

  const loginTitle = "Log In - Confluence";
  const adminLoginTitle = "Administrator Access - Confluence";

  if (pageTitle !== loginTitle && pageTitle !== adminLoginTitle) {
    return;
  }

  let password;
  let submitButton;

  if (pageTitle === loginTitle) {
    const username = await driver.findElement(By.id("os_username"));
    await username.sendKeys(USERNAME);
    const rememberMe = await driver.findElement(
      By.css('label[for="os_cookie"]')
    );
    await rememberMe.click();

    password = await driver.findElement(By.id("os_password"));
    submitButton = await driver.findElement(By.id("loginButton"));
  } else {
    password = await driver.findElement(By.id("password"));
    submitButton = await driver.findElement(By.id("authenticateButton"));
  }

  await password.sendKeys(PASSWORD);

  await submitButton.click();

  pageTitle = await driver.getTitle();

  await loginMiddleware(driver, By);
};

module.exports = loginMiddleware;
