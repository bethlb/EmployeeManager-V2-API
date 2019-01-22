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
    'QOBB-73 Save Regression': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-73

        // Save with valid values (not min or max lengths)
        employeeManagerPage
            .click('@employee5')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Homer Simpson')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1234567890')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Manager')
            .click('@saveButton')
            // Verify the name on the selection list is updated and all new field values have been set
            .expect.element('@employee5').text.to.equal('Homer Simpson')
        employeeManagerPage.verify.value('@nameEntry', 'Homer Simpson')
            .verify.value('@phoneEntry', '1234567890')
            .verify.value('@titleEntry', 'Manager')
    },

    'QOBB-73 Cancel Regression - Cancel No Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-73

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
            .assert.value('@nameEntry', 'Bernice Ortiz')
        employeeManagerPage.assert.value('@phoneEntry', '4824931093')
        employeeManagerPage.assert.value('@titleEntry', 'CEO')
            // Click on another employee
            .click('@employee2')
            // Click on first employee again and verify it still has original values
            .click('@employee1')
            .assert.value('@nameEntry', 'Bernice Ortiz')
        employeeManagerPage.assert.value('@phoneEntry', '4824931093')
        employeeManagerPage.assert.value('@titleEntry', 'CEO')
    },

    'QOBB-73 Cancel Regression - Cancel after to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-73

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
            .assert.value('@nameEntry', 'Joe Schmo')
        employeeManagerPage.assert.value('@phoneEntry', '4564564567')
        employeeManagerPage.assert.value('@titleEntry', 'Sales Manager')
            // Click on employee4
            .click('@employee4')
            // Click back on employee3 and verify it still has original values
            .click('@employee3')
            .assert.value('@nameEntry', 'Joe Schmo')
        employeeManagerPage.assert.value('@phoneEntry', '4564564567')
        employeeManagerPage.assert.value('@titleEntry', 'Sales Manager')
    },

    'QOBB-73 ID Regression - Check for valid ID': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-73

        var ids = [];
        for (var x = 1; x < 11; x++) {
            var empID = 'employee' + x;
            browser.useXpath()
            .click('//li[@name="employee' + x + '"]')
            employeeManagerPage.getText('@employeeID', function (result) {
                var str = result.value.substring(4);
                var num = Number(str, 10);
                // Verify id is an integer 
                employeeManagerPage.verify.ok(Number.isInteger(num), 'ID is an integer')
                // Check for no negative numbers
                .verify.ok(num > 0, 'ID is a positive integer')
                // Store number in id array
                ids.push(num);
                // Verify id is unique
                if (ids.length > 1) {
                    for (var i = 0; i < ids.length - 1; i++) {
                        employeeManagerPage.verify.ok(num != ids[i], 'ID is Unique')
                    }
                }
            });
        }
    }
}
