var employeeManagerPage = {}

var functions = require('../testAssets/functions')

let clickByText = functions.clickByText
let setForm = functions.setForm
let verifyForm = functions.verifyForm
let verifyEmployeeInList = functions.verifyEmployeeInList
let checkEnabled = functions.checkEnabled
let employee = {}

module.exports = {
        beforeEach: browser => {
                employeeManagerPage = browser.page.EmployeeManagerPageObject()
                employeeManagerPage.navigate()
                        .waitForElementVisible('@employee1', 8000)
        },

        after: browser => {
                browser.end()
        },

        'QOBB-59 No Save': browser => {
                // https://dmutah.atlassian.net/browse/QOBB-59

                // Add 4 new employees for this test
                employeeManagerPage.deleteNewEmployee()
                clickByText(browser, ' + Add Employee ')
                clickByText(browser, 'New Employee')
                setForm(employeeManagerPage, { name: 'Beth-Test1', phone: '1234567890', email: 'te1@gmail.com', title: 'Manager1' })
                clickByText(browser, ' Save ')
                clickByText(browser, ' + Add Employee ')
                clickByText(browser, 'New Employee')
                setForm(employeeManagerPage, { name: 'Beth-Test2', phone: '2345678902', email: 'te2@gmail.com', title: 'Manager2' })
                clickByText(browser, ' Save ')
                clickByText(browser, ' + Add Employee ')
                clickByText(browser, 'New Employee')
                setForm(employeeManagerPage, { name: 'Beth-Test3', phone: '3123456789', email: 'te3@gmail.com', title: 'Manager3' })
                clickByText(browser, ' Save ')
                clickByText(browser, ' + Add Employee ')
                clickByText(browser, 'New Employee')
                setForm(employeeManagerPage, { name: 'Beth-Test4', phone: '4234567890', email: 'te4@gmail.com', title: 'Manager4' })
                clickByText(browser, ' Save ')

                clickByText(browser, 'Beth-Test4')
                setForm(employeeManagerPage, { name: 'Homer Simpson', phone: '1234567890', email: 'homer@gmail.com', title: 'Manager' })
                // Verify selection list on left still has original name        
                verifyEmployeeInList(employeeManagerPage, '@lastEmployee', 'Beth-Test4')
                // Click on another employee name and verify name on left of original employee is still initial name
                clickByText(browser, 'Beth-Test3')
                verifyEmployeeInList(employeeManagerPage, '@lastEmployee', 'Beth-Test4')
                // Click on first employee again and verify it still has original values
                clickByText(browser, 'Beth-Test4')
                verifyForm(employeeManagerPage, { name: 'Beth-Test4', phone: '4234567890', email: 'te4@gmail.com', title: 'Manager4' })
        },

        'QOBB-59 Single Save': browser => {
                // https://dmutah.atlassian.net/browse/QOBB-59

                // Edit fields and click Save
                clickByText(browser, 'Beth-Test2')
                setForm(employeeManagerPage, { name: 'Homer Simpson', phone: '1234567890', email: 'homer@gmail.com', title: 'Manager' })
                clickByText(browser, ' Save ')
                verifyEmployeeInList(employeeManagerPage, '@thirdToLastEmployee', 'Homer Simpson')
                verifyForm(employeeManagerPage, { name: 'Homer Simpson', phone: '1234567890', email: 'homer@gmail.com', title: 'Manager' })
                // Edit all fields again but do not click Save 
                clickByText(browser, 'Homer Simpson')
                setForm(employeeManagerPage, { name: 'Marge Simpson', phone: '2323232323', email: 'marge@gmail.com', title: 'CFO' })
                //  Verify the Save and Cancel buttons go Active
                checkEnabled(employeeManagerPage, '@saveButton')
                checkEnabled(employeeManagerPage, '@cancelButton')
                // Click on a different employee; then click on the first employee again; Verify fields have Saved 
                // values; not the recently added values that weren't Saved.
                clickByText(browser, 'Beth-Test1')
                clickByText(browser, 'Homer Simpson')
                verifyForm(employeeManagerPage, { name: 'Homer Simpson', phone: '1234567890', email: 'homer@gmail.com', title: 'Manager' })
        },
        
        'QOBB-59 Double Save': browser => {
                // https://dmutah.atlassian.net/browse/QOBB-59
                
                // Click on employee and set new values for all fields; then Save
                clickByText(browser, 'Beth-Test3')
                setForm(employeeManagerPage, { name: 'Bart Simpson', phone: '4434567890', email: 'bart@gmail.com', title: 'Salesman' })
                clickByText(browser, ' Save ')
                // Edit all fields again, Verify the Save and Cancel buttons go Active; Click Save
                clickByText(browser, 'Bart Simpson')
                setForm(employeeManagerPage, { name: 'Bart Simpson', phone: '2323232323', email: 'marge@gmail.com', title: 'CFO' })
                checkEnabled(employeeManagerPage, '@saveButton')
                checkEnabled(employeeManagerPage, '@cancelButton')
                clickByText(browser, ' Save ')
                // Click on a different employee; then click on the original employee again; verify fields have second 
                // Saved values   
                clickByText(browser, 'Beth-Test4')
                clickByText(browser, "Bart Simpson")
                verifyForm(employeeManagerPage, { name: 'Bart Simpson', phone: '2323232323', email: 'marge@gmail.com', title: 'CFO' })

                // Delete 4 employees used for this test
                clickByText(browser, 'Beth-Test1')
                clickByText(browser, ' Delete ')
                browser.acceptAlert()
                browser.pause(2000)
                clickByText(browser, 'Homer Simpson')
                clickByText(browser, ' Delete ')
                browser.acceptAlert()
                browser.pause(2000)
                clickByText(browser, 'Bart Simpson')
                clickByText(browser, ' Delete ')
                browser.acceptAlert()
                browser.pause(2000)
                clickByText(browser, 'Beth-Test4')
                clickByText(browser, ' Delete ')
                browser.acceptAlert()
                browser.pause(2000)
        }
}
