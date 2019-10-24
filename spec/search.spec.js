const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

const { asserters } = wd;

describe("google search", () => {
  before(() => {
    browser = wd.promiseChainRemote();
    return browser
      .init({ browserName: "chrome" })
      .get("https://www.google.com/");
  });

  after(() => {
    browser.quit();
  });

  it("should be on google search page", done => {
    browser
      .title()
      .then(title => {
        title.should.equal("Google");
      })
      .nodeify(done);
  });

  it("should search for Cheese!", done => {
    browser
      .elementByName("q")
      .sendKeys("Cheese!")
      .sleep(1000)
      .elementByClassName("gNO89b")
      .should.eventually.exist.click()
      .nodeify(done);
  });

  it('the page title should start with "Cheese!"', done => {
    browser
      .waitForElementByCss("#resultStats", asserters.isDisplayed, 5000)
      .title()
      .then(title => {
        const words = title.split(" ");
        words[0].should.equal("Cheese!");
      })
      .nodeify(done);
  });
});
