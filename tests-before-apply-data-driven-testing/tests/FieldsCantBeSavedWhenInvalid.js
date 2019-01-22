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

    'QOBB-68 Name invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68

        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'abcdefghilabcdefghilabcdefghijasd')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Manager')
        checkDisabled(employeeManagerPage, '@saveButton')
    },

    'QOBB-68 Phone invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68

        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'George Washington')
        setFieldValue(employeeManagerPage, '@phoneEntry', '12345678')
        setFieldValue(employeeManagerPage, '@nameEntry', 'President')
        checkDisabled(employeeManagerPage, '@saveButton')
    },

    'QOBB-68 Title invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68

        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Martha Washington')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@nameEntry', 'abcdefghilabcdefghilabcdefghijasd')
        checkDisabled(employeeManagerPage, '@saveButton')
    },
}    