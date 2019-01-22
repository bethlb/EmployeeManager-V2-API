module.exports = {
    beforeEach: browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
            .waitForElementVisible('.titleBar', 5000)
    },
    after: browser => {
        browser.end()
    },

    'QOBB-67 Every field must be populated to Save': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-67
        // Test combinations of less than all fields populated.  Check for inactive Save button.
        // This automation fails...Nightwatch not clearing fields ??
        browser
            .click('li[name="employee5"]')
            .clearValue('input[name="nameEntry"]')
            .setValue('input[name="nameEntry"]', '')
            .clearValue('input[name="phoneEntry"]')
            .setValue('input[name="phoneEntry"]', '1234567890')
            .clearValue('input[name="titleEntry"]')
            .setValue('input[name="titleEntry"]', 'Manager')
            .expect.element('#saveBtn').to.have.attribute('disabled')
    },
}  