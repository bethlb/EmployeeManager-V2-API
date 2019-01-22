var employeeManagerPage = {}

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
        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Tom Brady')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', 'abc')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Football Star')
            .click('@saveButton')
            // Check that phone entry error message exists
            // Had problems with execution when had two expect failures - Test 2 fails at execution. This occurs even
            // when I set "skip_testcases_on_fail" to false in nightwatch conf file.
            // browser.expect.element('//div[@class="errorCard"]').to.be.present.  So commented out this line.

            .expect.element('@errorMessage1').text.to.equal('The phone number must be 10 digits long.')

        // Check for valid error message - contains "numeric"
        // browser.expect.element('(//div[@class="errorCard"][1])[contains(text(), "Numeric")]')
        // browser.expect.element('//div[@class="errorCard"][1]').text.to.equal('The phone field must be 10 digits long.')

    },

    'QOBB-62 Test invalid value types for each field - Test 2': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name has any character type; Phone has upper case letters;
        // TItle has any character type
        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Tom Brady')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', 'ABCDEFGHIJ')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Football Star')
            .click('@saveButton')
            // Check that phone entry error message exists
            .expect.element('@errorMessage1').text.to.equal('The phone number must be 10 digits long.')

    },

    'QOBB-62 Test invalid value types for each field - Test 3': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name has any character type; Phone has special characters;
        // TItle has any character type
        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Tom Brady')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '!@#$%&*()_')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Football Star')
            .click('@saveButton')
            // Check that phone entry error message exists
            .expect.element('@errorMessage1').text.to.equal('The phone number must be 10 digits long.')

    },

    'QOBB-62 Test invalid minimum field length': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name, Phone, Title must be 1 character minimum
        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', ' \uE003')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', ' \uE003')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', ' \uE003')
            .click('@saveButton')
            // Check for valid error message
            // browser.expect.element('//div[@class="errorCard"][1]').text.to.contain('The name field must be between 1 and 30 characters long. The phone number must be 10 digits long. The title field must be between 1 and 30 characters long.')
            // Updated test to adhere to new error message format in version 1.2.
            .expect.element('@errorMessage1').text.to.contain('The name field must be between 1 and 30 characters long.')
        employeeManagerPage.expect.element('@errorMessage2').text.to.contain('The phone number must be 10 digits long.')
        employeeManagerPage.expect.element('@errorMessage3').text.to.contain('The title field must be between 1 and 30 characters long.')

    },

    'QOBB-62 Test invalid maximum field length': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name and Phone greater than 30 characters, Title greater than 10 characters
        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'abcdefghijabcdefghilabcdefghijk')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '12345678901')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'abcdefghijabcdefghilabcdefghijk')
            .click('@saveButton')
            // Check for valid error message
            // browser.expect.element('//div[@class="errorCard"][1]').text.to.contain('The name field must be between 1 and 30 characters long. The phone number must be between 1 and 30 characters long. The title field must be between 1 and 30 characters long.')
            // Updated test to adhere to new error message format in version 1.2.
            .expect.element('@errorMessage1').text.to.contain('The name field must be between 1 and 30 characters long.')
        employeeManagerPage.expect.element('@errorMessage2').text.to.contain('The phone number must be 10 digits long.')
        employeeManagerPage.expect.element('@errorMessage3').text.to.contain('The title field must be between 1 and 30 characters long.')
    },

    'QOBB-62 Test invalid field is underlined in Red': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-62

        // Name has any character type; Phone has lower case letters;
        // TItle has any character type
        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Tom Brady')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', 'abc')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Football Star')
            .click('@saveButton')
            // Check that entire Phone Number line is bold red 
            .expect.element('@invalidInfo').to.have.css('border-bottom').which.equals('2px solid rgb(204, 0, 0)')
        employeeManagerPage.expect.element('@invalidInfo').to.have.css('border-bottom', 'Red Underline Present').which.equals('2px solid rgb(204, 0, 0)')
    },

}    