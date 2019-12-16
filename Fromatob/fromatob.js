var driver = browser.driver;

describe('Test suite for from atob', function () {
	beforeEach(function () {
		browser.waitForAngularEnabled(false);
		//claimPageObj = new claim_page();
		var url = 'https://www.fromatob.com/en-GB/';
		browser.manage().window().maximize();
		browser.get(url);
	});
	
	afterAll(function() {
        browser.executeScript('window.sessionStorage.clear();'); 
		browser.executeScript('window.localStorage.clear();'); 
		driver.close();
	});
	

	it('Claim', function () {
		browser.sleep(2000);
		browser.actions().mouseMove({ x: 50, y: 0 }).doubleClick().perform();
		browser.sleep(2000);
		element(by.xpath("//input[contains(@class,'input-stop__input input-stop__input--departure input-stop__input--empty')]")).sendKeys("Deurne");
		browser.sleep(2000);
		browser.actions().sendKeys(protractor.Key.ENTER).perform();

		browser.sleep(2000);
		element(by.xpath("//input[@class='input-stop__input input-stop__input--arrival input-stop__input--empty']")).sendKeys("Berlin, DE");
		browser.sleep(2000);
		browser.actions().sendKeys(protractor.Key.ENTER).perform();
		browser.sleep(2000);

		element(by.xpath("//a[contains(.,'Agree')]")).click();
		browser.sleep(3000)
		element(by.xpath("(//h2[@class='month__title'])[1]")).getText().then(function (currmonth) {
		});
		browser.sleep(2000);

		var someDate = new Date();
		var numberOfDaysToAdd = 14;
		someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
		var dd = someDate.getDate();
		var mm = someDate.getMonth() + 1;
		var y = someDate.getFullYear();

		var dateformat = y + "-" + mm + "-" + dd;

		element(by.xpath("//button[contains(.,'Return')]")).click().then(function () {
			browser.sleep(3000);
			console.log("dateformat 1 is"+dateformat);
			browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
			browser.sleep(2000);
			var eleme1 = element(by.xpath("//button[contains(@class,'day__btn day__btn-" + dateformat + "')]"));
			var present = element(by.xpath("//button[contains(@class,'day__btn day__btn-" + dateformat + "')]")).isPresent();
			console.log("element 1 is"+eleme1);
			console.log("present 1 is"+present);

			if (present) {
				browser.actions().mouseDown(eleme1).click().perform();
				browser.sleep(2000);
				browser.actions().sendKeys(protractor.Key.PAGE_UP).perform();
				browser.sleep(2000);
				element(by.xpath("//*[@id='app']/div/div/form/div[1]/div[4]/button")).click();

			} else {
				browser.executeScript('window.scrollTo(0,0);').then(function () {
				//	browser.actions().mouseDown(eleme1).click().perform();
				})
			}
		});

		browser.sleep(2000);

		browser.getWindowHandle().then(function (parentGUID) {
			// click the button to open new window
			// get the All the session id of the browsers
			browser.getAllWindowHandles().then(function (allId) {
				// iterate the values in the set
				for (let guid of allId) {
					// check the title of the page to match with "bing"
					browser.switchTo().window(guid);
					browser.sleep(3000);

					browser.getTitle().then(function (title) {
						if (title == "fromAtoB") {
							element(by.xpath("//*[@id='Search']/div[2]/div/div/div[2]/div[2]/div[3]/div/footer/button")).click();
							browser.sleep(3000);

							element(by.xpath("//label[@for='filter-plane'][contains(.,'Plane')]")).click();
							browser.sleep(2000);
							element(by.xpath("//label[@for='filter-bus']")).click();
							browser.sleep(2000);
							element(by.xpath("//label[@for='filter-ride_share']")).click();
							browser.sleep(2000);
							element(by.xpath("//span[contains(@class,'sort-type')]")).click().then(function () {
								browser.actions().mouseMove(element(by.xpath("//a[@href='#'][contains(.,'Duration')]"))).click().perform();
							})
							browser.sleep(2000);

							browser.actions().mouseMove({x: 100, y: 100}).mouseDown().perform(); // 100px from left, 100 px from top of plot0
							browser.sleep(2000);
							element(by.xpath("(//button[contains(.,'Choose')])[1]")).click();
							browser.sleep(3000);
							browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
							browser.sleep(2000);

							element(by.xpath("(//button[@type='button'][contains(.,'Choose')])[1]")).click();
							browser.sleep(2000);
							browser.actions().sendKeys(protractor.Key.PAGE_UP).perform();
							browser.sleep(2000);

							element(by.xpath("//span[contains(@class,'checkout-section-header__duration')]")).getText().then(function (text1) {
							console.log("The total duration is"+text1)	
							
							});
						
						}
					})
					
				}
			});
		});
		
	});
});