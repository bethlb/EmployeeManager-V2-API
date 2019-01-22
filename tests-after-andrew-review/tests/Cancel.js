module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
        .waitForElementVisible('.titleBar', 5000)
    },  
    after : browser => {
        browser.end()
    },    
'QOBB-60 Cancel prior to Save' : browser => {
    // Set new field values for employee1
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

'QOBB-60 Cancel after to Save' : browser => {
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
    }
}    