var employeeManagerPage = {}

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
        employeeManagerPage
            .click('@employee1')
            .expect.element('@saveButton').to.have.attribute('disabled')
        employeeManagerPage.clearValue('@nameEntry')
            .setValue('@nameEntry', 'Queen Elizabeth12$$')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Manager-(Dept 1)')
            .click('@saveButton')
            // Verify the name on the selection list is updated and all new field values have been set
            .expect.element('@employee1').text.to.equal('Queen Elizabeth12$$')
        employeeManagerPage.verify.value('@nameEntry', 'Queen Elizabeth12$$')
            .verify.value('@phoneEntry', '1234567890')
            .verify.value('@titleEntry', 'Manager-(Dept 1)')
    },
    'QOBB-60 Test minimum input length for each field': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Name with one character; Phone 10 digits; Title with one character 
        employeeManagerPage
            .click('@employee2')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Q')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '3334445555')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'M')
            .click('@saveButton')
            // Verify the name on the selection list is updated and all new field values have been set
            .expect.element('@employee2').text.to.equal('Q')
        employeeManagerPage.verify.value('@nameEntry', 'Q')
            .verify.value('@phoneEntry', '3334445555')
            .verify.value('@titleEntry', 'M')
    },
    'QOBB-60 Test maximum input length for each field': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Name with 30 characters; Phone with 10 digits; Title with 30 characters 
        employeeManagerPage
            .click('@employee3')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'ThisIsAVeryLongName 1234567890')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Manager of Dept 1234567890123$')
            .click('@saveButton')
            // Verify the name on the selection list is updated and all new field values have been set
            // browser.expect.element('@employee3').text.to.equal('')
            .verify.value('@nameEntry', 'ThisIsAVeryLongName 1234567890')
        employeeManagerPage.verify.value('@phoneEntry', '1234567890')
        employeeManagerPage.verify.value('@titleEntry', 'Manager of Dept 1234567890123$')
    },
}    