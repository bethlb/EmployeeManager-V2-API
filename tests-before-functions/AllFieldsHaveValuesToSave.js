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

    'QOBB-67 Every field must be populated to Save - Missing name value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67

        // Test combinations of less than all fields populated.  Check for inactive Save button.
        employeeManagerPage
            .click('@employee5')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', ' \uE003')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Manager')
        employeeManagerPage.expect.element('@saveButton').to.have.attribute('disabled')
    },
    'QOBB-67 Every field must be populated to Save - Missing phone value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67

        // Test combinations of less than all fields populated.  Check for inactive Save button.
        employeeManagerPage
            .click('@employee5')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', ' Cooper Boullianne')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', ' \uE003')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Big Shot')
        employeeManagerPage.expect.element('@saveButton').to.have.attribute('disabled')
    },
    'QOBB-67 Every field must be populated to Save - Missing title value': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67

        // Test combinations of less than all fields populated.  Check for inactive Save button.
        // This automation fails...Nightwatch not clearing fields ??
        employeeManagerPage
            .click('@employee7')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', ' New Guy')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', ' \uE003')
        employeeManagerPage.expect.element('@saveButton').to.have.attribute('disabled')
    },
}  