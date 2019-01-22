var employeeManagerPage = {}

var functions = require('../testAssets/functions')

let clickByText = functions.clickByText
let setForm = functions.setForm
let checkDisabled = functions.checkDisabled

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },
    after: browser => {
        browser.end()
    },

    'QOBB-67 Every field must be populated to Save - Missing name value': browser => {
    // https://dmutah.atlassian.net/browse/QOBB-67
    // Test combinations of less than all fields populated.  Check for inactive Save button.

        employeeManagerPage.click('@employee1')
        setForm(employeeManagerPage, {name: ' ', phone: '1234567890', email: 'abc@test.com', title: 'Manager'})
        browser.pause(5000)
        checkDisabled(employeeManagerPage, '@saveButton')            
    },
    
    'QOBB-67 Every field must be populated to Save - Missing phone value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67
        // Test combinations of less than all fields populated.  Check for inactive Save button.
        
        employeeManagerPage.click('@employee1')
        setForm(employeeManagerPage, {name: 'Cooper Boullianne', phone: ' ', email: 'abc@test.com', title: 'Big Shot'})
        browser.pause(5000)
        checkDisabled(employeeManagerPage, '@saveButton')            
    },

    'QOBB-67 Every field must be populated to Save - Missing email value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67
        // Test combinations of less than all fields populated.  Check for inactive Save button.
        
        employeeManagerPage.click('@employee1')
        setForm(employeeManagerPage, {name: 'Cooper Boullianne', phone: '1234567890 ', email: ' ', title: 'Big Shot'})
        browser.pause(5000)
        checkDisabled(employeeManagerPage, '@saveButton')            
    },
    
    'QOBB-67 Every field must be populated to Save - Missing title value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67
        // Test combinations of less than all fields populated.  Check for inactive Save button.
        
        employeeManagerPage.click('@employee1')
        setForm(employeeManagerPage, {name: 'New Guy', phone: '1234567890', email: 'abc@test.com', title: ' '})
        browser.pause(5000)
        checkDisabled(employeeManagerPage, '@saveButton')    
    },
}  