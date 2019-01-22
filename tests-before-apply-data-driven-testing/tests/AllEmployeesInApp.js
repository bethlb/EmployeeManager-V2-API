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

    'QOBB-56 Check all employee names correct after initial app load': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-56

        // employeeManagerPage.api.pause(5000)
        employeeManagerPage.expect.element('@employee1').text.to.equal('Bernice Ortiz').before(5000)
        employeeManagerPage.expect.element('@employee2').text.to.equal('Marnie Barnett').before(5000)
        employeeManagerPage.expect.element('@employee3').text.to.equal('Phillip Weaver').before(5000)
        employeeManagerPage.expect.element('@employee4').text.to.equal('Teresa Osborne').before(5000)
        employeeManagerPage.expect.element('@employee5').text.to.equal('Dollie Berry').before(5000)
        employeeManagerPage.expect.element('@employee6').text.to.equal('Harriett Williamson').before(5000)
        employeeManagerPage.expect.element('@employee7').text.to.equal('Ruby Estrada').before(5000)
        employeeManagerPage.expect.element('@employee8').text.to.equal('Lou White').before(5000)
        employeeManagerPage.expect.element('@employee9').text.to.equal('Eve Sparks').before(5000)
        employeeManagerPage.expect.element('@employee10').text.to.equal('Lois Brewer').before(5000)  
     }
}