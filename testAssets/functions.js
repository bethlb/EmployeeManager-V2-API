// Employee Manager functions

// Click employee by text name
var clickByText = (Page, text) => {
        Page
                .useXpath()
                .click(`//*[text()="${text}"]`)
                .useCss()
                .pause(2500)
}

// Verify employee name is in left hand employee list
var verifyEmployeeInList = (Page, employeeElement, employeeName) => {
        Page
                .expect.element(employeeElement).text.to.equal(employeeName)
}

// Verify employee name is not in left hand employee list
var verifyEmployeeNotInList = (Page, employeeElement, employeeName) => {
        Page
                .expect.element(employeeElement).text.to.not.equal(employeeName)
}

// Set all form values
var setForm = (Page, employee) => {
        Page.customClearValue(Page, '@nameEntry')
        Page.setValue('@nameEntry', employee.name)
        Page.customClearValue(Page, '@phoneEntry')
        Page.setValue('@phoneEntry', employee.phone)
        Page.customClearValue(Page, '@emailEntry')
        Page.setValue('@emailEntry', employee.email)
        Page.customClearValue(Page, '@titleEntry')
        Page.setValue('@titleEntry', employee.title)
}

// Get all form values
/*var getForm = (Page, employee) => {
        Page
                .getValue('@nameEntry', function (result) { employee.name = result.value })
                .getValue('@phoneEntry', function (result) { employee.phone = result.value })
                .getValue('@emailEntry', function (result) { employee.email = result.value })
                .getValue('@titleEntry', function (result) { employee.title = result.value })
        return employee
} */

// Verify all form values
var verifyForm = (Page, employee) => {
        Page
                .verify.value('@nameEntry', employee.name)
                .verify.value('@phoneEntry', employee.phone)
                .verify.value('@emailEntry', employee.email)
                .verify.value('@titleEntry', employee.title)
}

// Set individual field
var setFieldValue = (Page, field, fieldValue) => {
        Page
                .getValue(field, function(result) {
                        for (c in result.value) {
                            Page.setValue(field, "\u0008")
                        }
                    })                
                .setValue(field, fieldValue)
}

// Verify individual field
var verifyFieldValue = (Page, field, text) => {
        Page
                .verify.value(field, text)
}

// Check button is enabled
var checkEnabled = (Page, button) => {
        Page
                .expect.element(button).to.not.have.attribute('disabled')
}

// Check button is disabled
var checkDisabled = (Page, button) => {
        Page
                .expect.element(button).to.have.attribute('disabled')
}

module.exports.clickByText = clickByText
module.exports.verifyEmployeeInList = verifyEmployeeInList
module.exports.verifyEmployeeNotInList = verifyEmployeeNotInList
module.exports.setForm = setForm
module.exports.verifyForm = verifyForm
module.exports.setFieldValue = setFieldValue
module.exports.verifyFieldValue = verifyFieldValue
module.exports.checkEnabled = checkEnabled
module.exports.checkDisabled = checkDisabled