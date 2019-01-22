var employeeManagerPage = {}

module.exports = {
    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },
    after: browser => {
        browser.end()
    },
    'QOBB-75 Check for valid ID': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-75

        var ids = [];
        browser.elements('xpath', '//li[@class="listText"]', function (result) {
            numElems = result.value.length
        })

        // Wrapped loop under Nightwatch .perform(function(). Required to ensure loop gets executed synchronously at point it is in code.  Otherwise pure Javascript gets executed 
        // immediately ater compile.  Needed to ensure value of numElems has been calculated 
        // prior to the loop

        browser.perform(function () {
            for (var x = 2; x < numElems; x++) {
                browser.useXpath()
                    .click('//li[@class="listText"][' + x + ']')
                employeeManagerPage.getText('@employeeID', function (result) {
                    var str = result.value.substring(4);
                    var num = Number(str, 10);
                    browser.perform(function () {
                        console.log('ID = ', num)
                    })
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
        })
    }
}                      
