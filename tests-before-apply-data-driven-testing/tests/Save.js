var employeeManagerPage = {}

var editTest = require('../testAssets/editTest')

/**
 * Clicks an element whose text equals the `text` parameter - element must have a unique text value.
 * @param {object} browser - `browser`/`client` in use
 * @param {string} text - the text of the element that should be clicked
 */

var clickByText = (browser, text) => {
    browser
        .useXpath()
        .click(`//*[text()="${text}"]`)
        .useCss()
}

var setFieldValue = (Page, field, fieldValue) => {
    Page
        .clearValue(field)
        .setValue(field, fieldValue)
}

var verifyFieldValue = (Page, field, text) => {
    Page
        .verify.value(field, text)
}

var verifyEmployeeInList = (Page, employeeElement, employeeName) => {
    Page
        .expect.element(employeeElement).text.to.equal(employeeName)
}

var checkEnabled = (Page, button) => {
    Page
        .expect.element(button).to.not.have.attribute('disabled')
}


module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@titleText', 5000)
    },

    after: browser => {
        browser.end()
    },

    'QOBB-59 No Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-59

        clickByText(browser, 'Bernice Ortiz')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Manager')
        // Verify selection list on left still has original name        
        verifyEmployeeInList(employeeManagerPage, '@employee1', 'Bernice Ortiz')
        // Click on another employee name and verify name on left of original employee is still initial name
        clickByText(browser, 'Marnie Barnett')
        verifyEmployeeInList(employeeManagerPage, '@employee1', 'Bernice Ortiz')
        // Click on first employee again and verify it still has original values
        clickByText(browser, 'Bernice Ortiz')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Bernice Ortiz')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '4824931093')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'CEO')
    },

    'QOBB-59 Single Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-59

        // Click on employee and set new values for all fields; then Save

        // Replacing this code with editTest function
/*      clickByText(browser, 'Marnie Barnett')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Manager')
        clickByText(browser, ' Save ')
        // Verify the name on the selection list is updated and all new field values have been set
        verifyEmployeeInList(employeeManagerPage, '@employee2', 'Homer Simpson')
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'Manager')*/

        editTest(employeeManagerPage, 'Marnie Barnett', {name:'Homer Simpson', phone: '1234567890', title: 'Manager'}, 'Phillip Weaver')

        // Edit all fields again but do not click Save 
        clickByText(browser, "Homer Simpson")
        setFieldValue(employeeManagerPage, '@nameEntry', 'Marge Simpson')
        setFieldValue(employeeManagerPage, '@phoneEntry', '2323232323')
        setFieldValue(employeeManagerPage, '@titleEntry', 'CFO')
        //  Verify the Save and Cancel buttons go Active
        checkEnabled(employeeManagerPage, '@saveButton')
        checkEnabled(employeeManagerPage, '@cancelButton')
        // Click on a different employee; then click on the first employee again; Verify fields have Saved 
        // values; not the recently added values that weren't Saved.
        clickByText(browser, "Phillip Weaver")
        clickByText(browser, "Homer Simpson")
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'Manager')
    },

    'QOBB-59 Double Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-59

        // Click on employee and set new values for all fields; then Save
        // Replacing this text with editTest function
/*      clickByText(browser, "Teresa Osborne")
        setFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
        setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
        setFieldValue(employeeManagerPage, '@titleEntry', 'Manager')
        clickByText(browser, ' Save ') */

        editTest(employeeManagerPage, 'Teresa Osborne', {name:'Homer Simpson', phone: '1234567890', title: 'Manager'}, 'Phillip Weaver')

        // Edit all fields again, Verify the Save and Cancel buttons go Active; Click Save
        clickByText(browser, 'Homer Simpson')
        setFieldValue(employeeManagerPage, '@nameEntry', 'Marge Simpson')
        setFieldValue(employeeManagerPage, '@phoneEntry', '2323232323')
        setFieldValue(employeeManagerPage, '@titleEntry', 'CFO')
        checkEnabled(employeeManagerPage, '@saveButton')
        checkEnabled(employeeManagerPage, '@cancelButton')
        clickByText(browser, ' Save ')
        // Click on a different employee; then click on the original employee again; verify fields have second 
        // Saved values   
        clickByText(browser, "Dollie Berry")
        clickByText(browser, "Marge Simpson")
        verifyFieldValue(employeeManagerPage, '@nameEntry', 'Marge Simpson')
        verifyFieldValue(employeeManagerPage, '@phoneEntry', '2323232323')
        verifyFieldValue(employeeManagerPage, '@titleEntry', 'CFO')
    },

    // This automation fails; times out waiting for visible element after re-opening.  Concluded that 
    // Nightwatch does not work well when exit and re-enter within a test.

    /*  QOBB-59 Saved values persist after exit and re-enter application': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-59
           
            browser.end()
            browser.pause(5000)
            browser.url('https://devmountain-qa.github.io/employee-manager/1.0_Version/index.html')
            browser.waitForElementVisible('.titleBar', 5000)
            browser.click('li[name="employee-4"]')
            browser.verify.value('@nameEntry','Marge Simpson')
            browser.verify.value('@phoneEntry','2323232323')
            browser.verify.value('@titleEntry','CFO')   
        }, */

}
