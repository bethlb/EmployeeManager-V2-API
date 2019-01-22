module.exports = {
    beforeEach : browser => {
        browser.url('https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html')
        .waitForElementVisible('.titleBar', 5000)
    },  
    after : browser => {
        browser.end()
    },    
    'QOBB-58 Name, Phone and Title can be edited; Save and Cancel active when fields are edited' : browser => {
        // Name field can be edited; Save and Cancel buttons active when Name field is edited
        browser.click('li[name="employee1"]')
        browser.clearValue('input[name="nameEntry"]')
        browser.setValue('input[name="nameEntry"]','Bernice1')
        browser.assert.value('input[name="nameEntry"]','Bernice1')
        browser.expect.element('#saveBtn').to.not.have.attribute('disabled')
        browser.expect.element('button[name="cancel"]').to.not.have.attribute('disabled')
        // Phone field can be edited; Save and Cancel buttons active when Phone field is edited
        browser.click('li[name="employee2"]')
        browser.clearValue('input[name="phoneEntry"]')
        browser.setValue('input[name="phoneEntry"]','1234567890')
        browser.assert.value('input[name="phoneEntry"]','1234567890')
        browser.expect.element('#saveBtn').to.not.have.attribute('disabled')
        browser.expect.element('button[name="cancel"]').to.not.have.attribute('disabled')
        // Title field can be edited; Save and Cancel buttons active when Title field is edited
        browser.click('li[name="employee3"]')
        browser.clearValue('input[name="titleEntry"]')
        browser.setValue('input[name="titleEntry"]','Manager')
        browser.assert.value('input[name="titleEntry"]','Manager')
        browser.expect.element('#saveBtn').to.not.have.attribute('disabled')
        browser.expect.element('button[name="cancel"]').to.not.have.attribute('disabled')
    },

    'QOBB-58 ID field cannot be edited; Save and Cancel not active for ID': browser => {
        browser.click('li[name="employee5"]')
        browser.useXpath()
        browser.expect.element('//input[4]').not.be.present
        browser.useCss()
        browser.expect.element('#saveBtn').to.have.attribute('disabled')
        browser.expect.element('button[name="cancel"]').to.have.attribute('disabled')
     }
}