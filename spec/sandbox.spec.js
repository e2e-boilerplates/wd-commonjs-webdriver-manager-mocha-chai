const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");

const url = "https://e2e-boilerplate.github.io/sandbox/";

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("Sandbox", () => {
  before(() => {
    browser = wd.promiseChainRemote();
    return process.env.GITHUB_ACTIONS
      ? browser
          .init({
            browserName: "chrome",
            "goog:chromeOptions": {
              args: ["--headless", "--disable-gpu"],
              // eslint-disable-next-line global-require
              binary: require("puppeteer").executablePath(),
            },
          })
          .get(url)
      : browser
          .init({
            browserName: "chrome",
            "goog:chromeOptions": {
              args: ["--headless", "--disable-gpu"],
              // eslint-disable-next-line global-require
              binary: require("puppeteer").executablePath(),
            },
          })
          .get(url);
  });

  after(() => {
    browser.quit();
  });

  it("should be on Sandbox", (done) => {
    browser
      .title()
      .then((title) => {
        title.should.equal("Sandbox");
      })
      .elementByTagName("h1")
      .text()
      .then((text) => {
        text.should.equal("Sandbox");
      })
      .nodeify(done);
  });
});
