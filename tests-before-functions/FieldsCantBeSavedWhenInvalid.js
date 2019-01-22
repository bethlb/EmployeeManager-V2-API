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

    'QOBB-68 Name invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68

        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'abcdefghilabcdefghilabcdefghijasd')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Manager')
            .expect.element('@saveButton').to.have.attribute('disabled')
    },

    'QOBB-68 Phone invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68

        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'George Washington')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '12345678')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'President')
            .expect.element('@saveButton').to.have.attribute('disabled')
    },

    'QOBB-68 Title invalid; other fields valid': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-68

        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Martha Washington')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'abcdefghilabcdefghilabcdefghijasd')
            .expect.element('@saveButton').to.have.attribute('disabled')
    },
}    