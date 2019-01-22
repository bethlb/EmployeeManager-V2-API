var employeeManagerPage = {}

module.exports = {
    beforeEach : browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@titleText', 5000)
    },
    after : browser => {
        browser.end()
    },
    // 'QOBB-57 All Editor fields have initial values' : browser => {

    'QOBB-57 All Editor fields have initial values' : () => {
        // https://dmutah.atlassian.net/browse/QOBB-57

        employeeManagerPage.click('@employee1')
        employeeManagerPage.expect.element('@nameEntry').to.have.value.not.equals('').before(1000)
        employeeManagerPage.expect.element('@phoneEntry').to.have.value.not.equals('').before(1000)
        employeeManagerPage.expect.element('@titleEntry').to.have.value.not.equals('').before(1000)
        }
}