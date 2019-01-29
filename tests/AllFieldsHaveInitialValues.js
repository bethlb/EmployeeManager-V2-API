let employeeManagerPage = {}
let testData = require('../functions/data/testData')
let clickByText = require('../functions/clickByText')

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
        //  If New Employee already in progress, delete it
            .deleteNewEmployee()
    },
    after: browser => {
        browser.end()
    },

    'QOBB-57 All Employee fields have correct initial values': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-57

        //  If New Employee already in progress, delete it
        // employeeManagerPage.deleteNewEmployee()
        clickByText(browser, ' + Add Employee ')
        clickByText(browser, 'New Employee')
        employeeManagerPage
            .waitForElementVisible('@cardTitle', 5000)
        testData.initialFieldValues.forEach(test => {
            employeeManagerPage
                .verify.attributeEquals(test.field, 'value', test.fieldValue)
            // .expect.element(test.field).to.have.value.equals(test.fieldValue).before(1000)
        })
    }
}