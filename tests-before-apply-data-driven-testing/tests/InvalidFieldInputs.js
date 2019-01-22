var employeeManagerPage = {}

var checkForInvalidFields = require('../testAssets/checkForInvalidFields')

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

var verifyErrorMessage = (Page, errorMessageElement, text) => {
    Page
        .expect.element(errorMessageElement).text.to.equal(text)
}

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
        // Note - .waitForElementVisible failed in tests two and on when used with nigthwatch 
        // "skip_testcases_on_fail" = fales.  Instead used pause before each test.  
        // .waitForElementVisible('.titleText', 5000)
        employeeManagerPage.api.pause(2000)
    },
    after: browser => {
        browser.end()
    },

    'QOBB-62 Test invalid value types for each field - Test 1': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name has any character type; Phone has lower case letters;
        // TItle has any character type
        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Tom Brady')
        setFieldValue(employeeManagerPage, '@phoneEntry', 'abc')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Football Star')
        clickByText(browser, ' Save ')
        // Check that phone entry error message exists
        checkForInvalidFields(browser, {name: 'Tom Brady', phone: 'abc', title: 'Football Star'})
    },

    'QOBB-62 Test invalid value types for each field - Test 2': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name has any character type; Phone has upper case letters;
        // TItle has any character type
        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Tom Brady')
        setFieldValue(employeeManagerPage, '@phoneEntry', 'ABCDEFGHIJ')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Football Star')
        clickByText(browser, ' Save ')
        // Check that phone entry error occurs
        checkForInvalidFields(browser, {name: 'Tom Brady', phone: 'ABCDEFGHIJ', title: 'Football Star'})        
    },

    'QOBB-62 Test invalid value types for each field - Test 3': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name has any character type; Phone has special characters;
        // TItle has any character type
        clickByText(browser, 'Bernice Ortiz')
        employeeManagerPage
        setFieldValue(employeeManagerPage, '@nameEntry', 'Tom Brady')
        setFieldValue(employeeManagerPage, '@phoneEntry', '!@#$%&*()_')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Football Star')
        clickByText(browser, ' Save ')
        // Check that phone entry error occurs
        checkForInvalidFields(browser, {name: 'Tom Brady', phone: '!@#$%&*()_', title: 'Football Star'})             
    },

    'QOBB-62 Test invalid minimum field length': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name, Phone, Title must be 1 character minimum
        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', ' \uE003')
        setFieldValue(employeeManagerPage, '@phoneEntry', ' \uE003')
        setFieldValue(employeeManagerPage, '@titleEntry', ' \uE003')
        clickByText(browser, ' Save ')
        // Check that name, phone and title entry errors occur
        checkForInvalidFields(browser, {name: ' \uE003', phone: ' \uE003', title: ' \uE003'})             
    },

    'QOBB-62 Test invalid maximum field length': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name and Phone greater than 30 characters, Title greater than 10 characters

        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'abcdefghijabcdefghilabcdefghijk')
        setFieldValue(employeeManagerPage, '@phoneEntry', '12345678901')
        setFieldValue(employeeManagerPage, '@titleEntry', 'abcdefghijabcdefghilabcdefghijk')
        clickByText(browser, ' Save ')
        // Check that name, phone and title entry errors occur
        checkForInvalidFields(browser, {name: 'abcdefghijabcdefghilabcdefghijk', phone: '12345678901', title: 'abcdefghijabcdefghilabcdefghijk'})             

    },

    'QOBB-62 Test invalid field is underlined in Red': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name has any character type; Phone has lower case letters;
        // TItle has any character type

        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Tom Brady')
        setFieldValue(employeeManagerPage, '@phoneEntry', 'abc')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Football Star')
        clickByText(browser, ' Save ')
        // Check that entire Phone Number line is bold red 
        employeeManagerPage
            .expect.element('@invalidInfo').to.have.css('border-bottom').which.equals('2px solid rgb(204, 0, 0)')
        employeeManagerPage
            .expect.element('@invalidInfo').to.have.css('border-bottom', 'Red Underline Present').which.equals('2px solid rgb(204, 0, 0)')
    },

}    