var timer = 1000;
var driver = browser.driver;

describe('Test_suite_for_Login', function () {
	beforeEach(function () {
		console.log("before each case");
		browser.waitForAngularEnabled(false);
		//claimPageObj = new claim_page();
		var url = 'https://www.fromatob.com/en-GB/';
		browser.manage().window().maximize();
		browser.get(url);
	});

	it('Login', function () {
		browser.sleep(4000);
		browser.actions().mouseMove({ x: 50, y: 0 }).doubleClick().perform();
		browser.sleep(2000);
		element(by.xpath("//a[@href='/en-GB/login']")).click();
		browser.sleep(2000);
		element(by.xpath("//input[@type='email']")).sendKeys("abc@gmail.com");
		browser.sleep(2000);
		element(by.xpath("//input[@type='password']")).sendKeys("abc@123");
		browser.sleep(2000);
		element(by.xpath("//button[@type='submit']")).click();
		browser.sleep(2000);
		element(by.xpath("//*[@id='user-reception__error-box'][2]")).getText().then(function (text) {
			console.log("The text return is " + text);
			expect(text).toBe("Login successfully");
			browser.sleep(4000);
		});
		
	});
});