var employeeManagerPage = {}

var functions = require('../testAssets/functions')
var testData = require('../testAssets/testData')

let clickByText = functions.clickByText
let setFieldValue = functions.setFieldValue
let verifyFieldValue = functions.verifyFieldValue
let verifyEmployeeInList = functions.verifyEmployeeInList

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-60 Test all valid value types for each field': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        employeeManagerPage.deleteNewEmployee()

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