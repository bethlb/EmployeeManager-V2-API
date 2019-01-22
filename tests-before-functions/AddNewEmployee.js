var employeeManagerPage = {}

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@titleText', 5000)
    },

    after: browser => {
        browser.end()
        employeeManagerPage.api.pause(5000)
    },

    'QOBB-80 Verify new employee appears in left list when added': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        employeeManagerPage
            .click('@addEmployeeButton')
            .expect.element('@newEmployee').text.to.equal('New Employee')
    },

    'QOBB-80 Verify new employee has correct employee number': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        var new_emp_num = 0
        var last_emp_num = 0
        employeeManagerPage
            .getAttribute('@lastEmployee', 'name', function (result) {
                last_emp_num = Number(result.value.substring(8))
            })
            .click('@addEmployeeButton')
            .click('@newEmployee')
            .getText('@employeeID', function (result) {
                new_emp_num = Number(result.value)
            })
            .verify.ok(new_emp_num = last_emp_num + 1, 'New Employee has correct id')
    },

    'QOBB-80 Verify new employee field prompts have valid values': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        employeeManagerPage
            .click('@addEmployeeButton')
            .click('@newEmployee')
            .getValue('@nameEntry', function (result) {
                employeeManagerPage.verify.ok(result.value = "New Employee", 'Name field prompt is correct')
            })
            .getValue('@phoneEntry', function (result) {
                employeeManagerPage.verify.ok(result.value = "Phone Number", 'Phone number prompt is correct')
            })
            .getValue('@titleEntry', function (result) {
                employeeManagerPage.verify.ok(result.value = "New Title", 'Title field prompt is correct')
            })
    },

    'QOBB-80 Verify new employee Save is working': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        employeeManagerPage
            .click('@addEmployeeButton')
            .click('@newEmployee')
            .clearValue('@nameEntry')
            .setValue('@nameEntry', 'Casper the Ghost')
            .clearValue('@phoneEntry')
            .setValue('@phoneEntry', '1212121212')
            .clearValue('@titleEntry')
            .setValue('@titleEntry', 'Friendly Ghost')
            .click('@saveButton')
            .click('@employee3')
            .click('@newEmployee')
            .verify.value('@nameEntry', 'Casper the Ghost')
            .verify.value('@phoneEntry', '1212121212')
            .verify.value('@titleEntry', 'Friendly Ghost')
    },

    'QOBB-80 Verify + Add Employee is not visible after 20 employees': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-80

        // This test fails even though "+ Add Employee" is not visible??

        for (var i = 1; i < 21; i++) {
        employeeManagerPage    
            .click('@addEmployee')
            .waitForElementVisible('@titleText', 2000)
        }
        // browser.pause(60000)
        employeeManagerPage
            .expect.element('@addEmployeeButton').to.not.be.visible
    },
}