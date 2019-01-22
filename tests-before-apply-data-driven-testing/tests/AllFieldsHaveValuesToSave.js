var employeeManagerPage = {}

var clickByText = (browser, text) => {
    browser
        .useXpath()
        .click(`//*[text()="${text}"]`)
        .useCss()
}

var setFieldValue = (Page, field, fieldValue) => {
    Page
        .clearValue(field)
        .setValue(field, fieldValue)
}

var checkDisabled = (Page, button) => {
    Page
        .expect.element(button).to.have.attribute('disabled')
}

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@titleText', 5000)
    },
    after: browser => {
        browser.end()
    },

    'QOBB-67 Every field must be populated to Save - Missing name value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67

        // Test combinations of less than all fields populated.  Check for inactive Save button.
        clickByText(browser, 'Phillip Weaver')
        setFieldValue(employeeManagerPage, '@nameEntry', '')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Manager')
        checkDisabled(employeeManagerPage, '@saveButton')            
    },

    'QOBB-67 Every field must be populated to Save - Missing phone value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67

        // Test combinations of less than all fields populated.  Check for inactive Save button.
        clickByText(browser, 'Dollie Berry')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Cooper Boullianne')
        setFieldValue(employeeManagerPage, '@phoneEntry', '')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Big Shot')
        checkDisabled(employeeManagerPage, '@saveButton')            
    },

    'QOBB-67 Every field must be populated to Save - Missing title value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67

        // Test combinations of less than all fields populated.  Check for inactive Save button.
        // This automation fails...Nightwatch not clearing fields ??
        clickByText(browser, 'Ruby Estrada')
        setFieldValue(employeeManagerPage, '@nameEntry', 'New Guy')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@titleEntry', '')
        checkDisabled(employeeManagerPage, '@saveButton')    
    },
}  