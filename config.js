/* eslint-disable global-require */

function config(url, browser) {
  return process.env.GITHUB_ACTIONS
    ? browser
        .init({
          browserName: "chrome",
          "goog:chromeOptions": {
            args: ["--headless", "--disable-gpu"],
            binary: require("puppeteer").executablePath(),
          },
        })
        .get(url)
    : browser
        .init({
          browserName: "chrome",
          "goog:chromeOptions": {
            binary: require("puppeteer").executablePath(),
          },
        })
        .get(url);
}

module.exports = config;
