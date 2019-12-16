# AtoB-QA-Assignment

# Prerequisites

Protractor is a Node.js program. To run, you will need to have Node.js installed. You will download Protractor package using npm, which comes with Node.js. Check the version of Node.js you have by running node --version. Then, check the compatibility notes in the Protractor README to make sure your version of Node.js is compatible with Protractor.

By default, Protractor uses the Jasmine test framework for its testing interface.

In this task I set up a test using a local standalone Selenium Server to control browsers. You will need to have the Java Development Kit (JDK) installed to run the standalone Selenium Server. Check this by running java -version from the command line.

# Scenarios

# Feature 1: 

I want to be sure that our customers cannot login with non-existing
credentials.

-> I added scenarios where non-existing customer cannot login into the portal.

# Feature 2: 

As a user, I want to be able to select the shortest (duration) connection from Deutsche
Bahn for my trip.

-> Go to Homepage and Search 2 cities inside Germany
-> Select return date which is 14 day from current date.
-> Unselect other mode of transportation and only select Train option(DB)
-> Land to Overview page.

# Project Structure


FromAtoB

        |  
         node_modules
         
         reports
               |
               Dashboard reports
               Screenshorts
               
          Conf.js
          fromatob.js
          fromatobLogin.js
               
# Setup

Use npm to install Protractor globally with:

-> npm install -g protractor

This will install two command line tools, protractor and webdriver-manager. Try running protractor --version to make sure it's working.

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

-> webdriver-manager update

Now start up a server with:

-> webdriver-manager start

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at http://localhost:4444/wd/hub

Open a new command line or terminal window

This configuration tells Protractor where your test files (specs) are, and where to talk to your Selenium Server (seleniumAddress). It specifies that we will be using Jasmine for the test framework. It will use the defaults for all other configuration. Chrome is the default browser.

Now run the test with

-> protractor Conf.js --suite fromatob

# Reports

By Default,Protractor provide Jasmine framework to generate the report after execution, I have added fail screenshots in Report 
-> Scrneeshort folder and detail report for scenarios in Report-> Dashbord Report folder.
