var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var jasmineReporters = require('jasmine-reporters');
var today = new Date();
timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';

var reportsDirectory = './reports';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';
var screenshotDirectory = reportsDirectory + '/screenshots';
var nodemailer = require("nodemailer");

exports.config = {
	directConnect: true,
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['/fromatob.js'],
	specs: ['/fromatobLogin.js'],
	
	suites: {
        fromatob: [ 'fromatobLogin.js','fromatob.js']
    },

	multiCapabilities:
		[{
			'browserName': 'chrome',
			specs: 'features/chrome/*.feature'
		},
	//	{
		//	'browserName': 'firefox',
		//	specs: 'features/firefox/*.feature'
		//},
		//{
		//	'browserName': 'internet explorer',
		//	specs: 'features/ie/*.feature'
		//},
		//{
		//	'browserName': 'safari',
		//	specs: 'features/safari/*.feature'
		//}
],
	allScriptsTimeout: 190000,
	getPageTimeout: 25000,

	capabilities: {
		browserName: 'chrome'
	},

	jasmineNodeOpts: {
		showColors: true,   // Use colors in the command line report.  
		defaultTimeoutInterval: 190000   // Default time to wait in ms before a test fails.
	},
	//for reports
	onPrepare: function () {

		// xml report generated for dashboard
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			savePath: reportsDirectory + '/xml',
			filePrefix: 'xmlOutput'
		}));

		var fs = require('fs-extra');
		if (!fs.existsSync(dashboardReportDirectory)) {
			fs.mkdirSync(dashboardReportDirectory);
		}
		
		if (!fs.existsSync(dashboardReportDirectory)) {
			fs.mkdirSync(dashboardReportDirectory);
		}
		if (!fs.existsSync(screenshotDirectory)) {
			fs.mkdirSync(screenshotDirectory);
		}

		jasmine.getEnv().addReporter({
			specDone: function (result) {
				if (result.status == 'failed') {
					browser.getCapabilities().then(function (caps) {
						var browserName = caps.get('browserName');

						browser.takeScreenshot().then(function (png) {
							//	var stream = fs.createWriteStream(dashboardReportDirectory + "/" + browserName + '-' + result.fullName + timeStamp + '.png');
							var stream = fs.createWriteStream(screenshotDirectory + "/" + browserName + '-' + timeStamp + '.png');

							stream.write(new Buffer(png, 'base64'));
							stream.end();
						});
					});
				}
			}
		});
	},

	onComplete: function () {
		//var text1 = null;
		return new Promise(function (fulfill, reject) {
			var browserName, browserVersion;
			var capsPromise = browser.getCapabilities();
			capsPromise.then(function (caps) {
				browserName = caps.get('browserName');
				browserVersion = caps.get('version');
				platform = caps.get('platform');

				var HTMLReport = require('protractor-html-reporter-2');
				testConfig = {
					reportTitle: 'atob Test Execution Report',
					outputPath: dashboardReportDirectory,
					outputFilename: 'AtoB_Report_' + timeStamp,
					screenshotPath: './',
					testBrowser: browserName,
					browserVersion: browserVersion,
					modifiedSuiteName: false,
					screenshotsOnlyOnFailure: true,
					testPlatform: platform
				};

				new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);


			});
		});


	}
};


