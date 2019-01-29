let employeeManagerPage = {}
let clickByText = require('../functions/clickByText')
let setFieldValue = require('../functions/setFieldValue')
let verifyFieldValue = require('../functions/verifyFieldValue')
let checkEnabled = require('../functions/checkEnabled')
let checkDisabled = require('../functions/checkDisabled')

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },
    after: browser => {
        browser.end()
    },
    'QOBB-58 Name, Phone and Title can be edited; Save and Cancel active when fields are edited': browser => {
    // https://dmutah.atlassian.net/browse/QOBB-58

    // Name field can be edited; Save and Cancel buttons active when Name field is edited
        employeeManagerPage.click('@lastEmployee')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Bernice1')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Bernice1')
        checkEnabled(employeeManagerPage, '@saveButton')
        checkEnabled(employeeManagerPage, '@cancelButton')
    // Phone field can be edited; Save and Cancel buttons active when Phone field is edited
        employeeManagerPage.click('@lastEmployee')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')            
        checkEnabled(employeeManagerPage, '@saveButton')
        checkEnabled(employeeManagerPage, '@cancelButton')
    // Phone field can be edited; Save and Cancel buttons active when Email field is edited
        employeeManagerPage.click('@lastEmployee')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')            
        checkEnabled(employeeManagerPage, '@saveButton')
        checkEnabled(employeeManagerPage, '@cancelButton')        
    // Title field can be edited; Save and Cancel buttons active when Title field is edited
        employeeManagerPage.click('@lastEmployee')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Manager')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'Manager') 
        checkEnabled(employeeManagerPage, '@saveButton')
        checkEnabled(employeeManagerPage, '@cancelButton')
    }, 
 
    'QOBB-58 ID field cannot be edited; Save and Cancel not active for ID': browser => {
     // https://dmutah.atlassian.net/browse/QOBB-58
        employeeManagerPage.click('@lastEmployee')
        browser.getTagName('#employeeID', function (result) { 
            browser.verify.ok(result.value != "input", 'ID is not an input field')
        })        
        checkDisabled(employeeManagerPage, '@saveButton')
        checkDisabled(employeeManagerPage, '@cancelButton')
    }
}