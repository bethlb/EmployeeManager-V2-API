module.exports = {
    beforeEach: browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
            .waitForElementVisible('.titleText', 5000)
    },
    after: browser => {
        browser.end()
    },


    // 'QOBB-62 Test all invalid value types for each field - Test 1': browser => {
    //     // Name has any character type; Phone has lower case letters;
    //     // TItle has any character type
    //     browser.click('li[name="employee1"]')
    //     browser.clearValue('input[name="nameEntry"]')
    //     browser.setValue('input[name="nameEntry"]', 'Tom Brady')
    //     browser.clearValue('input[name="phoneEntry"]')
    //     browser.setValue('input[name="phoneEntry"]', 'abcdefghij')

    //     // Check for Red Underline for error with phone entry - ??

    //     browser.clearValue('input[name="titleEntry"]')
    //     browser.setValue('input[name="titleEntry"]', 'Football Star')
    //     browser.click('#saveBtn')
    //     browser.expect.element('#saveBtn').to.be.enabled.after(5000)
    //     // Check that phone entry error message exists
    //     browser.expect.element('input[name="phoneEntry"]').to.have.css('border-bottom').equals('2px solid rgb(204, 0, 0)')
    //     browser.useXpath()
    //     browser.expect.element('//div[@class="errorCard"]').to.be.present
    //     // Check for valid error message - contains "numeric"
    //     // browser.expect.element('(//div[@class="errorCard"][1])[contains(text(), "Numeric")]')
    //     browser.expect.element('//div[@class="errorCard"][1]').text.to.equal('T he phone field must be 10 digits long.')
    //     browser.useCss()

    //     // Check that entire Phone Number line is bold red - ??

    // },

    // 'QOBB-62 Test all invalid value types for each field - Test 2': browser => {
    //     // Name has any character type; Phone has upper case letters;
    //     // TItle has any character type
    //     browser.click('li[name="employee1"]')
    //     browser.clearValue('input[name="nameEntry"]')
    //     browser.setValue('input[name="nameEntry"]', 'Tom Brady')
    //     browser.clearValue('input[name="phoneEntry"]')
    //     browser.setValue('input[name="phoneEntry"]', 'ABCDEFGHIJ')

    //     // Check for Red Underline for error with phone entry - ??

    //     browser.clearValue('input[name="titleEntry"]')
    //     browser.setValue('input[name="titleEntry"]', 'Football Star')
    //     browser.click('#saveBtn')
    //     // Check that phone entry error message exists
    //     browser.useXpath()
    //     browser.expect.element('//div[@class="errorCard"]').to.be.present
    //     // Check for valid error message - contains "numeric"
    //     // browser.expect.element('(//div[@class="errorCard"][1])[contains(text(), "Numeric")]')
    //     browser.expect.element('//div[@class="errorCard"][1]').text.to.equal('The phone field must be 10 digits long.')

    //     // Check that entire Phone Number line is bold red - ??
    //     browser.useCss()

    // },

    // 'QOBB-62 Test all invalid value types for each field - Test 3': browser => {
    //     // Name has any character type; Phone has special characters;
    //     // TItle has any character type
    //     browser.click('li[name="employee1"]')
    //     browser.clearValue('input[name="nameEntry"]')
    //     browser.setValue('input[name="nameEntry"]', 'Tom Brady')
    //     browser.clearValue('input[name="phoneEntry"]')
    //     browser.setValue('input[name="phoneEntry"]', '!@#$%&*()_')

    //     // Check for Red Underline for error with phone entry - ??

    //     browser.clearValue('input[name="titleEntry"]')
    //     browser.setValue('input[name="titleEntry"]', 'Football Star')
    //     browser.click('#saveBtn')
    //     // Check that phone entry error message exists
    //     browser.useXpath()
    //     browser.expect.element('//div[@class="errorCard"]').to.be.present
    //     // Check for valud error message - contains "numeric"
    //     // browser.expect.element('(//div[@class="errorCard"][1])[contains(text(), "Numeric")]')
    //     browser.expect.element('//div[@class="errorCard"][1]').text.to.equal('The phone field must be 10 digits long.')

    //     // Check that entire Phone Number line is bold red - ??
    //     browser.useCss()

    // },

    'QOBB-62 Test error if not valid minimum field length': browser => {
        // Name, Phone, Title must be 1 character minimum
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]', ' \uE003')
        browser.clearValue('input[name="nameEntry"]')
        browser.clearValue('input[name="phoneEntry"]')
        browser.clearValue('input[name="titleEntry"]')
        browser.click('#saveBtn')
        browser.pause(5000)
        // Check that error message exists
        browser.useXpath()

        // This message is present when run manually, but not for automation ??
        browser.expect.element('//div[@class="errorCard"]').to.be.present
        // Check for valid error message
        browser.expect.element('//div[@class="errorCard"][1]').text.to.contain('The name field must be between 1 and 30 characters long. The phone number must be 10 digits long. The title field must be between 1 and 30 characters long.')
        // Check that Name, Phone and Title lines are in bold red - ??
        browser.useCss()
    },

    'QOBB-62 Test error if not valid maximum field length': browser => {
        // Name and Phone greater than 30 characters, Title greater than 10 characters
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]', 'abcdefghijabcdefghilabcdefghijk')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]', '12345678901')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]', 'abcdefghijabcdefghilabcdefghijk')
        browser.click('#saveBtn')
        browser.pause(5000)
        // Check that error message exists
        browser.useXpath()

        // This message is present when run manually, but not for automation ??
        browser.expect.element('//div[@class="errorCard"]').to.be.present
        // Check for valid error message
        browser.expect.element('//div[@class="errorCard"][1]').text.to.contain('The name field must be between 1 and 30 characters long. The phone field must be between 1 and 30 characters long. The title field must be between 1 and 30 characters long.')
        // Check that Name, Phone and Title lines are in bold red - ??
        browser.useCss()

    },
}    