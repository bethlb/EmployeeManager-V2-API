var employeeManagerPage = {}

var clickByText = (browser, text) => {
    browser
        .useXpath()
        .click(`//*[text()="${text}"]`)
        .useCss()
}

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },
    after: browser => {
        browser.end()
    },
    'QOB-55 All expected fields, labels and buttons are present': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-55
        employeeManagerPage.expect.element('@titleText').text.to.equal('Employee Manager')
        employeeManagerPage.expect.element('@noEmployeeSelected').text.to.equal('No Employee Selected')
        clickByText(browser, 'Do not Delete me')
        employeeManagerPage.expect.element('@nameLabel').text.to.equal('Name')
        employeeManagerPage.expect.element('@phoneLabel').text.to.equal('Phone Number')
        employeeManagerPage.expect.element('@emailLabel').text.to.equal('Email Address')
        employeeManagerPage.expect.element('@titleLabel').text.to.equal('Title')
        employeeManagerPage.expect.element('@employeeID').text.to.equal('ID: 1244')
        employeeManagerPage.expect.element('@cancelButton').text.to.equal('Cancel')
        employeeManagerPage.expect.element('@saveButton').text.to.equal('Save')
        employeeManagerPage.expect.element('@deleteButton').text.to.equal('Delete')
    }
}