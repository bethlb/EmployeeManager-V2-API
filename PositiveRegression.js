var employeeManagerPage = {}

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
        clickByText(browser, 'Dollie Berry')
        employeeManagerPage
            setFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
            setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
            setFieldValue(employeeManagerPage, '@titleEntry', 'Manager')  
        clickByText(browser, ' Save ')   
        // .expect.element('@employee5').text.to.equal('Homer Simpson')
        verifyEmployeeInList(employeeManagerPage, '@employee5', 'Homer Simpson')    
        // Verify the name on the selection list is updated and all new field values have been set
        employeeManagerPage    
            verifyFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')   
            verifyFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')   
            verifyFieldValue(employeeManagerPage, '@titleEntry', 'Manager')   
    },

    'QOBB-73 Cancel Regression - Cancel No Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-73

        clickByText(browser, 'Bernice Ortiz')
        employeeManagerPage
            setFieldValue(employeeManagerPage, '@nameEntry', 'Homer Simpson')
            setFieldValue(employeeManagerPage, '@phoneEntry', '1234567890')
            setFieldValue(employeeManagerPage, '@titleEntry', 'Manager')          
            // Click Cancel button
        clickByText(browser, ' Cancel ')   
            // Verify fields have original values; cancelled worked
            verifyFieldValue(employeeManagerPage, '@nameEntry', 'Bernice Ortiz')   
            verifyFieldValue(employeeManagerPage, '@phoneEntry', '4824931093')   
            verifyFieldValue(employeeManagerPage, '@titleEntry', 'CEO')  
            // Click on another employee
            clickByText(browser, 'Marnie Barnett')
            // Click on first employee again and verify it still has original values
            clickByText(browser, 'Bernice Ortiz')
            verifyFieldValue(employeeManagerPage, '@nameEntry', 'Bernice Ortiz')   
            verifyFieldValue(employeeManagerPage, '@phoneEntry', '4824931093')   
            verifyFieldValue(employeeManagerPage, '@titleEntry', 'CEO')              
    },

    'QOBB-73 Cancel Regression - Cancel after to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-73

        // Set new values for employee 3 and Save
        clickByText(browser, 'Phillip Weaver')
        employeeManagerPage
            setFieldValue(employeeManagerPage, '@nameEntry', 'Joe Schmo')
            setFieldValue(employeeManagerPage, '@phoneEntry', '4564564567')
            setFieldValue(employeeManagerPage, '@titleEntry', 'Sales Manager')          
        // Click Save button
        clickByText(browser, ' Save ')    
        // Set new values again for employee 3; Do not save; then Cancel
        clickByText(browser, 'Joe Schmo')
            setFieldValue(employeeManagerPage, '@nameEntry', 'Harry Potter')
            setFieldValue(employeeManagerPage, '@phoneEntry', '3636363636')
            setFieldValue(employeeManagerPage, '@titleEntry', 'Wizard')          
        // Click Cancel button
        clickByText(browser, ' Cancel ')   
        // Verify fields have the first set of values
            verifyFieldValue(employeeManagerPage, '@nameEntry', 'Joe Schmo')   
            verifyFieldValue(employeeManagerPage, '@phoneEntry', '4564564567')   
            verifyFieldValue(employeeManagerPage, '@titleEntry', 'Sales Manager')    
        // Click on employee4
        clickByText(browser, 'Teresa Osborne')    
        // Click back on employee3 and verify it still has original values
        clickByText(browser, 'Joe Schmo')    
            verifyFieldValue(employeeManagerPage, '@nameEntry', 'Joe Schmo')   
            verifyFieldValue(employeeManagerPage, '@phoneEntry', '4564564567')   
            verifyFieldValue(employeeManagerPage, '@titleEntry', 'Sales Manager')   
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
