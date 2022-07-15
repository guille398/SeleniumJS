var assert    = require("chai").assert;
const { expect } = require("chai");
const fs = require('fs')
const webdriver = require('selenium-webdriver')
    By = webdriver.By
    until = webdriver.until

webdriver.promise.USE_PROMISE_MANAGER = false;

const chrome = require('selenium-webdriver/chrome');

const path = require('chromedriver').path

const service = new chrome.ServiceBuilder(path).build()
chrome.setDefaultService(service)

describe('Make a google search', function () {
    let driver
    
    before(function () {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()        
    })

    after( function() {
        driver.quit()
    })

    it('I enter a term to search', async function () {
        let term = 'Tomate'
        this.timeout(20000)
        driver.get('http://www.google.com')
        const searchbox = await driver.findElement(By.css("input[name='q']"))
        await driver.wait(until.elementIsVisible(searchbox),1000)
        await searchbox.sendKeys(term)
        const searchbutton = await driver.findElement(By.css("input[name='btnK']"))
        await driver.wait(until.elementIsVisible(searchbutton),1000)
        await searchbutton.click()
        const searchresults = await driver.findElements(By.css('#rso > div > div > div > div > div > a > h3'))                 
        for (let elem of searchresults){              
            expect(await (await elem.getText()).toLowerCase()).to.contain(term.toLowerCase())            
        }            
    })
})