module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
        browser.waitForElementVisible('.titleBar', 5000)
    },
    after: browser => {
        browser.end()
    },
    'QOB-55 All expected fields, labels and buttons are present': browser => {
        browser.expect.element('span[class="titleText"]').text.to.equal('Employee Manager')
        browser.expect.element('#noEmployee').text.to.equal('No Employee Selected')
        browser.click('li[name="employee1"]')
        browser.expect.element('li[name="employee1"]').text.to.equal('Bernice Ortiz')
        browser.expect.element('.infoCard > div > span:nth-child(7)').text.to.equal('Name')
        browser.expect.element('.infoCard > div > span:nth-child(9)').text.to.equal('Phone Number')
        browser.expect.element('.infoCard > div > span:nth-child(11)').text.to.equal('Title')
        // browser.useXpath()
        // browser.verify.visible('(//*[@id="noEmployee"])[text()=" No Employee Selected "]')
    }
}