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
},

    employeeManagerPage = {};

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

            // browser.getText('@employee1', function(result) {
            // console.log(result.value);
            // });        

            // Click on employee and enter new values for all fields, but do not Save
            // .click('@employee1')
            clickByText(browser, "Bernice Ortiz")
            employeeManagerPage
                .clearValue('@nameEntry')
                .setValue('@nameEntry', 'Homer Simpson')
                .clearValue('@phoneEntry')
                .setValue('@phoneEntry', '1234567890')
                .clearValue('@titleEntry')
                .setValue('@titleEntry', 'Manager')
                // Expect name on left hand selection list to be original employee name
                .expect.element('@employee1').text.to.equal('Bernice Ortiz')
            // Click on another employee name and verify name on left is still original employee name
            // employeeManagerPage.click('@employee2')
            clickByText(browser, "Marnie Barnett")
            employeeManagerPage
                .expect.element('@employee1').text.to.equal('Bernice Ortiz')
            // employeeManagerPage.click('@employee1')
            clickByText(browser, "Bernice Ortiz")
            employeeManagerPage
                .verify.value('@nameEntry', 'Bernice Ortiz')
                .verify.value('@phoneEntry', '4824931093')
                .verify.value('@titleEntry', 'CEO')
        },

        'QOBB-59 Single Save': browser => {
            // https://dmutah.atlassian.net/browse/QOBB-59

            // Click on employee and set new values for all fields; then Save

            // Note: Initially tried clearing all 3 values and then setting all 3 values; but values were
            // not getting set correctly.  Worked around by clearing, then setting values for each field 
            // individually.  Seems to be a nightwatch problem.

            // .click('@employee2')
            clickByText(browser, "Marnie Barnett")
            employeeManagerPage
                .clearValue('@nameEntry')
                .setValue('@nameEntry', 'Homer Simpson')
                .clearValue('@phoneEntry')
                .setValue('@phoneEntry', '1234567890')
                .clearValue('@titleEntry')
                .setValue('@titleEntry', 'Manager')
                .click('@saveButton')
                // Verify the name on the selection list is updated and all new field values have been set
                .expect.element('@employee2').text.to.equal('Homer Simpson')
            employeeManagerPage.verify.value('@nameEntry', 'Homer Simpson')
                .verify.value('@phoneEntry', '1234567890')
                .verify.value('@titleEntry', 'Manager')
            // Edit all fields again but do not click Save
            // .click('@employee2')
            clickByText(browser, "Homer Simpson")
            employeeManagerPage
                .clearValue('@nameEntry')
                .setValue('@nameEntry', 'Marge Simpson')
                .clearValue('@phoneEntry')
                .setValue('@phoneEntry', '2323232323')
                .clearValue('@titleEntry')
                .setValue('@titleEntry', 'CFO')
                //  Verify the Save and Cancel buttons go Active
                .expect.element('@saveButton').to.not.have.attribute('disabled')
            employeeManagerPage.expect.element('@cancelButton').to.not.have.attribute('disabled')
            // Click on a different employee; then click on the first employee again; Verify fields have saved 
            // values; not the recently added values that weren't saved.
            // employeeManagerPage.click('@employee3')
            // .click('@employee2')
            clickByText(browser, "Homer Simpson")
            employeeManagerPage
                .verify.value('@nameEntry', 'Homer Simpson')
                .verify.value('@phoneEntry', '1234567890')
                .verify.value('@titleEntry', 'Manager')
        },

        'QOBB-59 Double Save': browser => {
            // https://dmutah.atlassian.net/browse/QOBB-59

            // Click on employee and set new values for all fields; then Save
            // .click('@employee4')
            clickByText(browser, "Teresa Osborne")
            employeeManagerPage
                .clearValue('@nameEntry')
                .setValue('@nameEntry', 'Homer Simpson')
                .clearValue('@phoneEntry')
                .setValue('@phoneEntry', '1234567890')
                .clearValue('@titleEntry')
                .setValue('@titleEntry', 'Manager')
                .click('@saveButton')
            // Edit all fields again, Verify the Save and Cancel buttons go Active; Click Save
            // .click('@employee4')
            clickByText(browser, "Homer Simpson")
            employeeManagerPage
                .clearValue('@nameEntry')
                .setValue('@nameEntry', 'Marge Simpson')
                .clearValue('@phoneEntry')
                .setValue('@phoneEntry', '2323232323')
                .clearValue('@titleEntry')
                .setValue('@titleEntry', 'CFO')
                .api.pause(5000)
            employeeManagerPage.expect.element('@saveButton').to.not.have.attribute('disabled')
            employeeManagerPage.expect.element('@cancelButton').to.not.have.attribute('disabled')
            employeeManagerPage.click('@saveButton')
            // Click on a different employee; then click on the original employee again; verify fields have second 
            // saved values   
            // .click('@employee5')
            // .click('@employee4')
            clickByText(browser, "Dollie Berry")
            clickByText(browser, "Marge Simpson")
            employeeManagerPage
                .verify.value('@nameEntry', 'Marge Simpson')
                .verify.value('@phoneEntry', '2323232323')
                .verify.value('@titleEntry', 'CFO')

        },

        // This automation fails; times out waiting for visible element after re-opening.  Concluded that 
        // Nightwatch does not work well when exit and re-enter within a test.

        /*   'QOBB-59 Saved values persist after exit and re-enter application': browser => {
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
