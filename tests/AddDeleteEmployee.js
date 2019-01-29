let employeeManagerPage = {}
let testData = require('../functions/data/testData')
let clickByText = require('../functions/clickByText')
let verifyEmployeeInList = require('../functions/verifyEmployeeInList')
let verifyEmployeeNotInList = require('../functions/verifyEmployeeNotInList')
let setForm = require('../functions/setForm')
let verifyForm = require('../functions/verifyForm')
let checkEnabled = require('../functions/checkEnabled')
let deleteEmployee = require('../functions/deleteEmployee')
var current_emp_id = ''
var last_emp_id = ''

module.exports = {

    before: browser => {
        // Save last employee id to use later for employee cleanup   
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
            .clickLastEmployee()
            .getText('@employeeID', function (result) {
                last_emp_id = result.value.substring(4);
            })
        //  If New Employee already in progress, delete it
            .deleteNewEmployee()
    },

    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
        //  If New Employee already in progress, delete it
            .deleteNewEmployee()
        // Delete any added new employees used in previous tests
            .clickLastEmployee()
            .getText('@employeeID', function (result) {
                current_emp_id = result.value.substring(4)
            })
        browser.perform(function () {
            while (Number(current_emp_id) > Number(last_emp_id)) {
                deleteEmployee(employeeManagerPage.api, current_emp_id)
                current_emp_id = Number(current_emp_id) - 1
            }
        })
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-80 Verify new employee appears in left list when added': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        clickByText(browser, ' + Add Employee ')
        browser.pause(1000)
        // Use API getEmployees here?
        verifyEmployeeInList(employeeManagerPage, '@lastEmployee', 'New Employee')
    },

    'QOBB-80 Verify new employee has correct employee number': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        let new_emp_num = 0
        let last_emp_num = 0
        employeeManagerPage
            .getAttribute('@lastEmployee', 'name', function (result) {
                last_emp_num = Number(result.value.substring(8))
            })
        clickByText(browser, ' + Add Employee ')
        clickByText(browser, 'New Employee')
        employeeManagerPage
            .getText('@employeeID', function (result) {
                new_emp_num = Number(result.value)
            })
            .verify.ok(new_emp_num = last_emp_num + 1, 'New Employee has correct id')
    },

    'QOBB-80 Verify new employee field prompts have valid values': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        clickByText(browser, ' + Add Employee ')
        clickByText(browser, 'New Employee')
        testData.fieldPrompts.forEach(test => {
            employeeManagerPage
                .getText(test.field, function (result) {
                    employeeManagerPage.verify.ok(result.value == test.fieldPrompt)
                })
        })
    },

    'QOBB-80 Verify new employee Save is working': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        clickByText(browser, ' + Add Employee ')
        clickByText(browser, 'New Employee')
        setForm(employeeManagerPage, { name: 'Casper the Ghost', phone: '1212121212', email: 'casper@gmail.com', title: 'Friendly Ghost' })
        checkEnabled(employeeManagerPage, '@saveButton')
        clickByText(browser, ' Save ')
        employeeManagerPage.click('@employee1')
        employeeManagerPage.click('@lastEmployee')
        verifyForm(employeeManagerPage, { name: 'Casper the Ghost', phone: '1212121212', email: 'casper@gmail.com', title: 'Friendly Ghost' })
    },

    'QOBB-80 Delete Employee': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        // Test Delete with Cancel and OK
        clickByText(browser, ' + Add Employee ')
        clickByText(browser, 'New Employee')
        setForm(employeeManagerPage, { name: 'Casper the Ghost', phone: '1212121212', email: 'casper@gmail.com', title: 'Friendly Ghost' })
        clickByText(browser, ' Save ')
        clickByText(browser, 'Casper the Ghost')
        clickByText(browser, ' Delete ')
        browser.dismissAlert()
        browser.pause(5000)
        verifyEmployeeInList(employeeManagerPage, '@lastEmployee', "Casper the Ghost")
        clickByText(browser, 'Casper the Ghost')
        clickByText(browser, ' Delete ')
        browser.acceptAlert()
        browser.pause(5000)
        verifyEmployeeNotInList(employeeManagerPage, '@lastEmployee', "Casper the Ghost")
    }
}