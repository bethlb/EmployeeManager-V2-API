module.exports = {
    beforeEach: browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
            .waitForElementVisible('.titleBar', 5000)
    },
    after: browser => {
        browser.end()
    },

    'QOBB-68 Name invalid; other fields valid': browser => {
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]', 'abcdefghilabcdefghilabcdefghijasd')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]', '1234567890')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]', 'Manager')
        browser.expect.element('#saveBtn').to.have.attribute('disabled')
    },      

    'QOBB-68 Phone invalid; other fields valid': browser => {
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]', 'George Washington')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]', '12345678')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]', 'President')
        browser.expect.element('#saveBtn').to.have.attribute('disabled')
    },      

    'QOBB-68 Title invalid; other fields valid': browser => {
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]', 'Martha Washington')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]', '1234567890')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]', 'abcdefghilabcdefghilabcdefghijasd')
        browser.expect.element('#saveBtn').to.have.attribute('disabled')
    },      
}    