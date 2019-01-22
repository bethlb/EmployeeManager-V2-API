module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
        .waitForElementVisible('.titleBar', 5000)
    },      
    after : browser => {
        browser.end()
    },

    'QOBB-60 Test all valid value types for each field': browser => {
        // Name with letters (lower and upper case), special characters and numbers; Phone 10 digits 
        // numeric; Title with letters (lower and upper case), special characters and numbers.
        browser.click('li[name="employee1"]')
        browser.expect.element('#saveBtn').to.have.attribute('disabled')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Queen Elizabeth12$$')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','1234567890')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','Manager-(Dept 1)')
        browser.click('#saveBtn')
        // Verify the name on the selection list is updated and all new field values have been set
        browser.expect.element('li[name="employee1"]').text.to.equal('Queen Elizabeth12$$')
        browser.verify.value('input[name="nameEntry"]','Queen Elizabeth12$$')
        browser.verify.value('input[name="phoneEntry"]','1234567890')
        browser.verify.value('input[name="titleEntry"]','Manager-(Dept 1)')  
    },
    'QOBB-60 Test minimum input length for each field': browser => {
        // Name with one character; Phone 10 digits; Title with one character 
        browser.click('li[name="employee2"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Q')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','3334445555')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','M')
        browser.click('#saveBtn')
        // Verify the name on the selection list is updated and all new field values have been set
        browser.expect.element('li[name="employee2"]').text.to.equal('Q')
        browser.verify.value('input[name="nameEntry"]','Q')
        browser.verify.value('input[name="phoneEntry"]','3334445555')
        browser.verify.value('input[name="titleEntry"]','M')  
    },
    'QOBB-60 Test maximum input length for each field': browser => {
        // Name with 30 characters; Phone with 10 digits; Title with 30 characters 
        browser.click('li[name="employee3"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','ThisIsAVeryLongName 1234567890')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','1234567890')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','Manager of Dept 1234567890123$')
        browser.click('#saveBtn')
        // Verify the name on the selection list is updated and all new field values have been set
        // browser.expect.element('li[name="employee3"]').text.to.equal('')
        browser.verify.value('input[name="nameEntry"]','ThisIsAVeryLongName 1234567890')
        browser.verify.value('input[name="phoneEntry"]','1234567890')
        browser.verify.value('input[name="titleEntry"]','Manager of Dept 1234567890123$')  
    },    
}    