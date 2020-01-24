const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("Sandbox", () => {
  before(() => {
    browser = wd.promiseChainRemote();
    return browser
      .init({ browserName: "chrome" }) // TODO headless
      .get("https://e2e-boilerplates.github.io/sandbox/");
  });

  after(() => {
    browser.quit();
  });

  it("should be on Sandbox", done => {
    browser
      .title()
      .then(title => {
        title.should.equal("Sandbox");
      })
      .elementByTagName("h1")
      .text()
      .then(text => {
        text.should.equal("Sandbox");
      })
      .nodeify(done);
  });
});
