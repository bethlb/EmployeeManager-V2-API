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

var verifyFieldValue = (Page, field, text) => {
    Page    
        .verify.value(field, text)
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

   'QOBB-60 Cancel prior to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Set new field values for employee1
        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Manager')
            // Click Cancel button
        clickByText(browser, ' Cancel ')
            // Verify fields have original values; cancelled worked
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Bernice Ortiz')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '4824931093')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'CEO')
            // Click on another employee
        clickByText(browser, 'Marnie Barnett')
            // Click on first employee again and verify it still has original values
        clickByText(browser, 'Bernice Ortiz')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Bernice Ortiz')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '4824931093')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'CEO')
        },

    'QOBB-60 Cancel after to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Set new values for employee 3 and Save
        clickByText(browser, 'Phillip Weaver')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Joe Schmo')
        setFieldValue(employeeManagerPage, '@phoneEntry', '4564564567')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Sales Manager')
        clickByText(browser, ' Save ')
        // Set new values again for employee 3; Do not Save; then Cancel
        clickByText(browser, 'Joe Schmo')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Harry Potter')
        setFieldValue(employeeManagerPage, '@phoneEntry', '3636363636')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Wizard')     
        clickByText(browser, ' Cancel ')
        // Verify fields have the first set of values
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Joe Schmo')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '4564564567')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'Sales Manager')
        // Click on employee4
        clickByText(browser, 'Teresa Osborne')
        // Click back on employee3 and verify it still has original values
        clickByText(browser, 'Joe Schmo')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Joe Schmo')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '4564564567')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'Sales Manager')                    }
    }    