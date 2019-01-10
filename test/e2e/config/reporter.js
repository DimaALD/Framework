let reporter = require(`cucumber-html-reporter`);

let options = {
  theme: `bootstrap`,
  jsonFile: `./reports/report.json`,
  output: `./reports/cucumber_report.html`,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version":"0.0.2",
    "Test Environment": "STAGING",
    "Browser": "Chrome",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "On local machine"
  }
};

reporter.generate(options);