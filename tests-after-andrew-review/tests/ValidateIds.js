var ids = [];

module.exports = {
    beforeEach: browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
            .waitForElementVisible('.titleBar', 5000)
    },
    after: browser => {
        browser.end()
    },
    'QOBB-75 Check for valid ID': browser => {
        browser.useXpath()
        for (var x = 1; x < 11; x++) {
             var empID = 'employee' + x;
            browser.click('//li[@name="employee' + x + '"]')
            browser.getText('(//span[@name="employeeID"])', function (result) {
                var str = result.value.substring(4);
                var num = Number(str, 10);
                // Verify id is an integer 
                browser.verify.ok(Number.isInteger(num), 'ID is an integer')
                // Check for no negative numbers
                browser.verify.ok(num > 0, 'ID is a positive integer')                
                // Store number in id array
                ids.push(num);
                // Verify id is unique
                if (ids.length > 1) {
                    for (var i = 0; i < ids.length - 1; i++) {
                        browser.verify.ok(num != ids[i], 'ID is Unique')
                    }
                }
            });
        }
    }
}                      
