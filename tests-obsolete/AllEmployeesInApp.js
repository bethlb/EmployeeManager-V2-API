var employeeManagerPage = {}

var testData = require('../testAssets/testData')

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@titleText', 5000)
    },

    after: browser => {
        browser.end()
        employeeManagerPage.api.pause(5000)
    },

    'QOBB-56 Check all employee names correct after initial app load': browser => {
    // https://dmutah.atlassian.net/browse/QOBB-56

        testData.initialEmployeeList.forEach (test => {
            employeeManagerPage
                .expect.element(test.employee).text.to.equal(test.text).before(2000)
        })
}