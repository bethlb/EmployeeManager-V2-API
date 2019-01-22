var employeeManagerPage = {}

var functions = require('../testAssets/functions')

let clickByText = functions.clickByText
let setForm = functions.setForm
let getForm = functions.getForm
let verifyForm = functions.verifyForm
let employee = {}

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },
    after: browser => {
        browser.end()
    },

    'QOBB-60 Cancel prior to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Delete "New Employee" if one already in progress    
        employeeManagerPage.deleteNewEmployee()
        // Add new employee for this test
        clickByText(browser, ' + Add Employee ')
        clickByText(browser, 'New Employee')
        setForm(employeeManagerPage, { name: 'Beth-Test1', phone: '1234567890', email: 'Beth-Test1@gmail.com', title: 'Manager' })
        clickByText(browser, ' Save ')
        // Set new values for this newly added employee
        clickByText(browser, 'Beth-Test1')
        setForm(employeeManagerPage, { name: 'Beth-Test2 ', phone: '2234567890', email: 'Beth-Test2@gmail.com', title: 'Owner' })
        // Click Cancel button
        clickByText(browser, ' Cancel ')
        // Verify fields have original values; cancelled worked
        verifyForm(employeeManagerPage, { name: 'Beth-Test1', phone: '1234567890', email: 'Beth-Test1@gmail.com', title: 'Manager' })
        // Click on another employee
        employeeManagerPage.click('@employee1')
        // Click on newly created employee again and verify it still has original values
        clickByText(browser, 'Beth-Test1')
        verifyForm(employeeManagerPage, { name: 'Beth-Test1', phone: '1234567890', email: 'Beth-Test1@gmail.com', title: 'Manager' })
    },

    'QOBB-60 Cancel after Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Set new values for Beth-Test1  and Save
        clickByText(browser, 'Beth-Test1')
        setForm(employeeManagerPage, { name: 'Beth-Test3', phone: '4564564567', email: 'Beth-Test3@gmail.com', title: 'Sales Manager' })
        clickByText(browser, ' Save ')
        // Set new values again for this employee; Do not Save; then Cancel
        clickByText(browser, 'Beth-Test3')
        setForm(employeeManagerPage, { name: 'Beth-Test4', phone: '3636363636', email: 'Beth-Test4@gmail.com', title: 'Owner' })
        clickByText(browser, ' Cancel ')
        // Verify fields have the first set of values
        verifyForm(employeeManagerPage, { name: 'Beth-Test3', phone: '4564564567', email: 'Beth-Test3@gmail.com', title: 'Sales Manager' })
        // Click on employee1
        employeeManagerPage.click('@employee1')
        // Click back on Beth-Test3 Schmo and verify it still has original values
        clickByText(browser, 'Beth-Test3')
        verifyForm(employeeManagerPage, { name: 'Beth-Test3', phone: '4564564567', email: 'Beth-Test3@gmail.com', title: 'Sales Manager' })

        // Delete test employee(s) used for these tests
        clickByText(browser, 'Beth-Test3')
        clickByText(browser, ' Delete ')
        browser.acceptAlert()
        browser.pause(2000)
    }
}    