module.exports = {
    beforeEach: browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
            .waitForElementVisible('.titleBar', 5000)
    },
    after: browser => {
        browser.end()
    },
    'QOBB-73 Save Regression': browser => {
        // Save with valid values (not min or max lengths)
        browser.click('li[name="employee5"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]', 'Homer Simpson')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]', '1234567890')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]', 'Manager')
        browser.click('#saveBtn')
        // Verify the name on the selection list is updated and all new field values have been set
        browser.expect.element('li[name="employee5"]').text.to.equal('Homer Simpson')
        browser.verify.value('input[name="nameEntry"]', 'Homer Simpson')
        browser.verify.value('input[name="phoneEntry"]', '1234567890')
        browser.verify.value('input[name="titleEntry"]', 'Manager')
    },        

    'QOBB-73 Cancel Regression - Cancel No Save': browser => {
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Homer Simpson')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','1234567890')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','Manager')
        // Click Cancel button
        browser.click('.neutralButton')
        // Verify fields have original values; cancelled worked
        browser.assert.value('input[name="nameEntry"]','Bernice Ortiz')
        browser.assert.value('input[name="phoneEntry"]','4824931093')
        browser.assert.value('input[name="titleEntry"]','CEO')
        // Click on another employee
        browser.click('li[name="employee2"]')
        // Click on first employee again and verify it still has original values
        browser.click('li[name="employee1"]')
        browser.assert.value('input[name="nameEntry"]','Bernice Ortiz')
        browser.assert.value('input[name="phoneEntry"]','4824931093')
        browser.assert.value('input[name="titleEntry"]','CEO')
    },

    'QOBB-73 Cancel Regression - Cancel after to Save' : browser => {
        // Set new values for employee 3 and Save
        browser.click('li[name="employee3"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Joe Schmo')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','4564564567')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','Sales Manager')
        browser.click('#saveBtn')
        // Set new values again for employee 3; Do not save; then Cancel
        browser.click('li[name="employee3"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Harry Potter')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','3636363636')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','Wizard')    
        browser.click('.neutralButton')
        // Verify fields have the first set of values
        browser.assert.value('input[name="nameEntry"]','Joe Schmo')
        browser.assert.value('input[name="phoneEntry"]','4564564567')
        browser.assert.value('input[name="titleEntry"]','Sales Manager')  
        // Click on employee4
        browser.click('li[name="employee4"]')
        // Click back on employee3 and verify it still has original values
        browser.click('li[name="employee3"]')
        browser.assert.value('input[name="nameEntry"]','Joe Schmo')
        browser.assert.value('input[name="phoneEntry"]','4564564567')
        browser.assert.value('input[name="titleEntry"]','Sales Manager')  
    },

    'QOBB-73 ID Regression - Check for valid ID': browser => {
        var ids = [];
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