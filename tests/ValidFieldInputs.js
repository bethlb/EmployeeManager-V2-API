let employeeManagerPage = {}
let testData = require('../functions/data/testData')
let clickByText = require('../functions/clickByText')
let setFieldValue = require('../functions/setFieldValue')
let verifyFieldValue = require('../functions/verifyFieldValue')
let verifyEmployeeInList = require('../functions/verifyEmployeeInList')

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
        // Delete New Employee if one is in progress    
            employeeManagerPage.deleteNewEmployee()
    },

    after: browser => {
        browser.end()
    },

    'QOBB-60 Test all valid value types for each field': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        testData.validFieldValues.forEach(test => {
            employeeManagerPage
            clickByText(browser, ' + Add Employee ')
            clickByText(browser, 'New Employee')
            setFieldValue(employeeManagerPage, '@nameEntry', test.nameField)
            setFieldValue(employeeManagerPage, '@phoneEntry', test.phoneField)
            setFieldValue(employeeManagerPage, '@emailEntry', test.emailField)
            setFieldValue(employeeManagerPage, '@titleEntry', test.titleField)
            clickByText(browser, ' Save ')
            verifyEmployeeInList(employeeManagerPage, '@lastEmployee', test.nameField)
            verifyFieldValue(employeeManagerPage, '@nameEntry', test.nameField)
            verifyFieldValue(employeeManagerPage, '@phoneEntry', test.phoneField)
            verifyFieldValue(employeeManagerPage, '@emailEntry', test.emailField)
            verifyFieldValue(employeeManagerPage, '@titleEntry', test.titleField)
            employeeManagerPage.click('@lastEmployee')
            clickByText(browser, ' Delete ')
            browser.acceptAlert()
            browser.pause(2000)
        })
    }
}    