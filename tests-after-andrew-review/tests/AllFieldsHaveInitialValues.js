module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
        .waitForElementVisible('.titleBar', 5000)
    },
    after : browser => {
        browser.end()
    },
    'QOBB-57 All Editor fields have initial values' : browser => {
        browser.click('li[name="employee1"]')
        browser.expect.element('input[name="nameEntry"]').to.have.value.not.equals('').before(1000)
        browser.expect.element('input[name="phoneEntry"]').to.have.value.not.equals('').before(1000)
        browser.expect.element('input[name="titleEntry"]').to.have.value.not.equals('').before(1000)
        }
}