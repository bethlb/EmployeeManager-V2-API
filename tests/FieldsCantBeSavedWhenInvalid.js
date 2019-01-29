let clickByText = require('../functions/clickByText')
let setForm = require('../functions/setForm')
let checkDisabled = require('../functions/checkDisabled')

module.exports = {
    before: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
        //  If New Employee already in progress, delete it
            .deleteNewEmployee()
    },    
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },
    after: browser => {
        browser.end()
    },

    'QOBB-68 Name invalid; other fields valid': browser => {
    // https://dmutah.atlassian.net/browse/QOBB-68

        employeeManagerPage.click('@lastEmployee')
        setForm(employeeManagerPage, {name: 'abcdefghilabcdefghilabcdefghijasd', phone: '1234567890', email: 'abc@gmai.com', title: 'Manager'})
        checkDisabled(employeeManagerPage, '@saveButton')
    },
    
    'QOBB-68 Phone invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68
        
        employeeManagerPage.click('@lastEmployee')
        setForm(employeeManagerPage, {name: 'George Washington', phone: '12345678', email: 'abc@gmail.com', title: 'President'})
        checkDisabled(employeeManagerPage, '@saveButton')
    },

    'QOBB-68 Email invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68
        
        employeeManagerPage.click('@lastEmployee')
        setForm(employeeManagerPage, {name: 'George Washington', phone: '1234567890', email: 'gmail.com', title: 'President'})
        checkDisabled(employeeManagerPage, '@saveButton')
    },    
    
    'QOBB-68 Title invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68
        
        employeeManagerPage.click('@lastEmployee')
        setForm(employeeManagerPage, {name: 'Martha  Washington', phone: '1234567890', email: 'abc@gmail.com', title: 'abcdefghilabcdefghilabcdefghijasd'})
        checkDisabled(employeeManagerPage, '@saveButton')
    },
}    