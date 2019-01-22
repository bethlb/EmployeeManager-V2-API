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
    // browser.verify.ElementNotPresent('.errorCard')
}

var verifyFieldValue = (Page, field, text) => {
    Page
        .verify.value(field, text)
}

var verifyEmployeeInList = (Page, employeeElement, employeeName) => {
    Page
        .expect.element(employeeElement).text.to.equal(employeeName)
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

    'QOBB-60 Test all valid value types for each field': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Name with letters (lower and upper case), special characters and numbers; Phone 10 digits 
        // numeric; Title with letters (lower and upper case), special characters and numbers.
        clickByText(browser, 'Bernice Ortiz')
        checkDisabled(employeeManagerPage, '@saveButton')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Queen Elizabeth12$$')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Manager-(Dept 1)')
        // clickByText(browser, ' Save ')         
        clickByText(browser, ' Save ')
        // Verify the name on the selection list is updated and all new field values have been set
        verifyEmployeeInList(employeeManagerPage, '@employee1', 'Queen Elizabeth12$$')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Queen Elizabeth12$$')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'Manager-(Dept 1)')
    },

    'QOBB-60 Test minimum input length for each field': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Name with one character; Phone 10 digits; Title with one character 
        clickByText(browser, 'Marnie Barnett')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Q')
        setFieldValue(employeeManagerPage, '@phoneEntry', '3334445555')
        setFieldValue(employeeManagerPage, '@titleEntry', 'M')
        // clickByText(browser, ' Save ')         
        clickByText(browser, ' Save ')
        // Verify the name on the selection list is updated and all new field values have been set
        verifyEmployeeInList(employeeManagerPage, '@employee2', 'Q')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Q')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '3334445555')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'M')
    },

    'QOBB-60 Test maximum input length for each field': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Name with 30 characters; Phone with 10 digits; Title with 30 characters 
        clickByText(browser, 'Phillip Weaver')
        setFieldValue(employeeManagerPage, '@nameEntry', 'ThisIsAVeryLongName 1234567890')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Manager of Dept 1234567890123$')
        clickByText(browser, ' Save ')
        // Verify the name on the selection list is updated and all new field values have been set
        verifyEmployeeInList(employeeManagerPage, '@employee3', 'ThisIsAVeryLongName 1234567890')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'ThisIsAVeryLongName 1234567890')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'Manager of Dept 1234567890123$')
    },
}    