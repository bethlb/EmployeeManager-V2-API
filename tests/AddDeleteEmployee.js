var employeeManagerPage = {}

var functions = require('../testAssets/functions')
var testData = require('../testAssets/testData')

let clickByText = functions.clickByText
let verifyEmployeeInList = functions.verifyEmployeeInList
let verifyEmployeeNotInList = functions.verifyEmployeeNotInList
let setForm = functions.setForm
let verifyForm = functions.verifyForm
let checkEnabled = functions.checkEnabled

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },

    after: browser => {
        browser.end()
        employeeManagerPage.api.pause(5000)
    },

    'QOBB-80 Verify new employee appears in left list when added': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        // Delete "New Employee" if one already exists    
        employeeManagerPage.deleteNewEmployee()
        clickByText(browser, ' + Add Employee ')
        browser.pause(1000)
        verifyEmployeeInList(employeeManagerPage, '@lastEmployee', 'New Employee')
    },

    'QOBB-80 Verify new employee has correct employee number': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        // Delete "New Employee" in list if one already in progress
        employeeManagerPage.deleteNewEmployee()
        var new_emp_num = 0
        var last_emp_num = 0
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

        // Delete "New Employee" in list if one already in progress
        employeeManagerPage.deleteNewEmployee()
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

        // Delete "New Employee" in list if one already in progress
        employeeManagerPage.deleteNewEmployee()
        clickByText(browser, ' + Add Employee ')
        clickByText(browser, 'New Employee')
        setForm(employeeManagerPage, {name: 'Casper the Ghost', phone: '1212121212', email: 'casper@gmail.com', title: 'Friendly Ghost'})
        checkEnabled(employeeManagerPage, '@saveButton')
        clickByText(browser, ' Save ')
        employeeManagerPage.click('@employee1')
        employeeManagerPage.click('@lastEmployee')
        verifyForm(employeeManagerPage, {name: 'Casper the Ghost', phone: '1212121212', email: 'casper@gmail.com', title: 'Friendly Ghost'}) 
    },
    'QOBB-80 Delete Employee': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80
        
        // Test Delete with Cancel and OK
        clickByText(browser, 'Casper the Ghost')
        clickByText(browser, ' Delete ')
        browser.dismissAlert()
        browser.pause(2000)
        verifyEmployeeInList(employeeManagerPage, '@lastEmployee', "Casper the Ghost")         
        clickByText(browser, 'Casper the Ghost')
        clickByText(browser, ' Delete ')
        browser.acceptAlert()
        browser.pause(2000)
        verifyEmployeeNotInList(employeeManagerPage, '@lastEmployee', "Casper the Ghost") 
    } 
}