const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const app = require("../../src/app");

describe("Home Page E2E Test", () => {
  let server;
  let driver;

  beforeAll((done) => {
    server = app.listen(3000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(async () => {
    const options = new chrome.Options();
    options.addArguments(
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage",
    );
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      // Connects to the standalone Selenium container via the Docker network
      .usingServer("http://selenium:4444/wd/hub")
      .build();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  test("loads home page and checks header", async () => {
    // Inside Jenkins, container name 'jenkins' hosts the app on port 3000
    await driver.get("http://jenkins:3000");
    const headerText = await driver.findElement(By.css("h1")).getText();
    expect(headerText).toBe("Welcome to CI/CD");
  });
});
