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
    'QOBB-58 Name, Phone and Title can be edited; Save and Cancel active when fields are edited': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-58

        employeeManagerPage
            // Name field can be edited; Save and Cancel buttons active when Name field is edited
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Bernice1')
            .assert.value('@nameEntry', 'Bernice1')
        employeeManagerPage.expect.element('@saveButton').to.not.have.attribute('disabled')
        employeeManagerPage.expect.element('@cancelButton').to.not.have.attribute('disabled')
            // Phone field can be edited; Save and Cancel buttons active when Phone field is edited
        employeeManagerPage
            .click('@employee2')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .assert.value('@phoneEntry', '1234567890')
        employeeManagerPage.expect.element('@saveButton').to.not.have.attribute('disabled')
        employeeManagerPage.expect.element('@cancelButton').to.not.have.attribute('disabled')
            // Title field can be edited; Save and Cancel buttons active when Title field is edited
        employeeManagerPage.click('@employee3')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Manager')
            .assert.value('@titleEntry', 'Manager')
       employeeManagerPage.expect.element('@saveButton').to.not.have.attribute('disabled')
       employeeManagerPage.expect.element('@cancelButton').to.not.have.attribute('disabled')
    },

    'QOBB-58 ID field cannot be edited; Save and Cancel not active for ID': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-58

        employeeManagerPage
            .click('@employee5')
            .expect.element('idEntry').to.not.be.present
        employeeManagerPage.expect.element('@saveButton').to.have.attribute('disabled')
        employeeManagerPage.expect.element('@cancelButton').to.have.attribute('disabled')
    }
}