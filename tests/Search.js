let employeeManagerPage = {}
let testData = require('../functions/data/testData')
let employeeData = require('../functions/data/employees')
let clickByText = require('../functions/clickByText')
let setForm = require('../functions/setForm')
let setFieldValue = require('../functions/setFieldValue')
let verifyFieldValue = require('../functions/verifyFieldValue')
let verifyEmployeeInList = require('../functions/verifyEmployeeInList')
let postEmployee = require('../functions/postEmployee')
let deleteEmployee = require('../functions/deleteEmployee')

module.exports = {
    before: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
        // Delete New Employee if one is aleady in progress
        employeeManagerPage.deleteNewEmployee()
        // Add employees to be used in these tests usin API
        for (i = 4; i < 8; i++) {
            postEmployee(employeeManagerPage.api, employeeData[i])
        }
    },

    beforeEach: browser => {
        employeeManagerPage = browser.page.EmployeeManagerPageObject()
        employeeManagerPage.navigate()
            .waitForElementVisible('@employee1', 8000)
    },

    after: browser => {
        // Clean up remaining test employees 
        deleteEmployee(employeeManagerPage.api, employeeData[4].id)
        deleteEmployee(employeeManagerPage.api, employeeData[6].id)
        deleteEmployee(employeeManagerPage.api, employeeData[7].id)
        browser.end()
    },

    'QOBB-60 Search results correct': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-147

        // Save original employee list      
        browser.elements('xpath', '//li[@class="listText"]', function (result) {
            numElems = result.value.length
        })
        var origList = [];
        browser.perform(function () {
            for (i = 2; i < numElems; i++) {
                browser.useXpath()
                browser.getText(`//li[@class="listText"][${i}]`, function (result) {
                    origList[i - 2] = result.value
                })
                browser.useCss()
            }
        })

        testData.searchInputAndResults.forEach(test => {
            setFieldValue(employeeManagerPage, '@searchInput', test.input)
            browser.waitForElementVisible('li[name="searchEmployee"]', 4000)
            for (i = 0; i < test.results.length; i++) {
                browser.useXpath()
                    .verify.elementPresent(`//li[@class="listText"][${i + 2}][text()="${test.results[i]}"]`)
                    .useCss()
            }
            employeeManagerPage.click('@clearButton')

            // Save employee list that is displayed after Clear      
            browser.elements('xpath', '//li[@class="listText"]', function (result) {
                numElems = result.value.length
            })
            var curList = [];
            browser.perform(function () {
                for (i = 2; i < numElems; i++) {
                    browser.useXpath()
                    browser.getText(`//li[@class="listText"][${i}]`, function (result) {
                        curList[i - 2] = result.value
                    })
                    browser.useCss()
                }
            })

            // Verify that employee list displayed after Clear is the same as the original employee list
            browser.perform(function () {
                browser.verify.ok(JSON.stringify(curList) === JSON.stringify(origList), 'Correct employees are displayed after Clear')
            })
        })
    },

    /*  'QOBB-60 Verify added employee which matches search criteria is in Search Results': browser => {
            // https://dmutah.atlassian.net/browse/QOBB-147
    
            setFieldValue(employeeManagerPage, '@searchInput', "abcd@mail.com")
            browser.useXpath()
                .verify.elementPresent(`//li[@class="listText"][2][text()="Cooper Smith"]`)
                .useCss()
            clickByText(browser, ' + Add Employee ')
            clickByText(browser, 'New Employee')
            setForm(employeeManagerPage, { name: 'Jane Smith', phone: '5675675678', email: 'abcd@mail.com', title: 'CIO' })
            clickByText(browser, ' Save ')
            browser.pause(2000)
                .useXpath()
                .verify.elementPresent(`//li[@class="listText"][text()="Jane Smith"]`)
                .useCss()
        }, */

    'QOBB-60 Verify modified employee which does not match search criteria is not in Search Results': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-147

        setFieldValue(employeeManagerPage, '@searchInput', "abcd@mail.com")
        browser.useXpath()
            .verify.elementPresent(`//li[@class="listText"][2][text()="Cooper Smith"]`)
            .useCss()
        clickByText(browser, 'Cooper Jones')
        setForm(employeeManagerPage, { name: 'Cooper Jones', phone: '0987654321', email: 'ab@mail.om', title: 'Manager3' })
        clickByText(browser, ' Save ')
        browser.pause(2000)
        browser.useXpath()
            .verify.elementNotPresent(`//li[@class="listText"][text()="Cooper Jones"]`)
            .useCss()
    },

    'QOBB-60 Verify deleted employee from Search Results is no longer in Search Results': browser => {
        // https://dmutah.atlassian.net/browse/QOBB-147
        setFieldValue(employeeManagerPage, '@searchInput', "0987654321")
        browser.useXpath()
            .verify.elementPresent(`//li[@class="listText"][2][text()="Cooper Smith"]`)
            .useCss()
        clickByText(browser, 'Brett Smith')
        clickByText(browser, ' Delete ')
        browser.acceptAlert()
        browser.pause(2000)
        clickByText(browser, ' Save ')
        browser.useXpath()
            .verify.elementNotPresent(`//li[@class="listText"][text()="Brett Smith"]`)
            .useCss()

        // Cleanup - Delete remaining employees used in these tests
     /*   employeeManagerPage.click('@clearButton')
        clickByText(browser, 'Cooper Smith')
        clickByText(browser, ' Delete ')
        browser.acceptAlert()
        browser.pause(2000)
        clickByText(browser, 'Cooper Jones')
        clickByText(browser, ' Delete ')
        browser.acceptAlert()
        browser.pause(2000)
        clickByText(browser, 'Sean Smith')
        clickByText(browser, ' Delete ')
        browser.acceptAlert()
        browser.pause(2000) */
    },
}