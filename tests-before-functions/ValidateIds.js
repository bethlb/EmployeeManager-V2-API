var ids = [];
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
    'QOBB-75 Check for valid ID': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-75

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
