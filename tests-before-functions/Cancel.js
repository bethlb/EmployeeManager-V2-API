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
   'QOBB-60 Cancel prior to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Set new field values for employee1
        employeeManagerPage
            .click('@employee1')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Homer Simpson')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Manager')
            // Click Cancel button
            .click('@cancelButton')
            // Verify fields have original values; cancelled worked
        employeeManagerPage.assert.value('@nameEntry', 'Bernice Ortiz')
        employeeManagerPage.assert.value('@phoneEntry', '4824931093')
        employeeManagerPage.assert.value('@titleEntry', 'CEO')
            // Click on another employee
        employeeManagerPage.click('@employee2')
            // Click on first employee again and verify it still has original values
        employeeManagerPage.click('@employee1')
        employeeManagerPage.assert.value('@nameEntry', 'Bernice Ortiz')
        employeeManagerPage.assert.value('@phoneEntry', '4824931093')
        employeeManagerPage.assert.value('@titleEntry', 'CEO')
        },

    'QOBB-60 Cancel after to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-60

        // Set new values for employee 3 and Save
        employeeManagerPage
            .click('@employee3')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Joe Schmo')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '4564564567')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Sales Manager')
            .click('@saveButton')
        // Set new values again for employee 3; Do not save; then Cancel
            .click('@employee3')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Harry Potter')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '3636363636')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Wizard')
            .click('@cancelButton')
        // Verify fields have the first set of values
             employeeManagerPage.assert.value('@nameEntry', 'Joe Schmo')
             employeeManagerPage.assert.value('@phoneEntry', '4564564567')
             employeeManagerPage.assert.value('@titleEntry', 'Sales Manager')
        // Click on employee4
             employeeManagerPage.click('@employee4')
        // Click back on employee3 and verify it still has original values
             employeeManagerPage.click('@employee3')
             employeeManagerPage.assert.value('@nameEntry', 'Joe Schmo')
             employeeManagerPage.assert.value('@phoneEntry', '4564564567')
             employeeManagerPage.assert.value('@titleEntry', 'Sales Manager')
        }
    }    