module.exports = (browser, employeeInfo) => {
    browser.useXpath()
    if (employeeInfo.name) {
        if (employeeInfo.name.length < 1 || employeeInfo.name.length > 30) {
            browser.expect.element('(//div)[text()="The name field must be between 1 and 30 characters long. "]').to.be.visible
        }    
    }
    if (employeeInfo.phone) {
        if (employeeInfo.phone.length < 1 || employeeInfo.phone.length > 10) {
            browser.expect.element('(//div)[text()="The phone number must be 10 digits long. "]').to.be.visible
        }    
        if (isNaN(employeeInfo.phone)) {
            browser.expect.element('(//div)[text()="The phone number must be 10 digits long. "]').to.be.visible             
        }
    }    
    if (employeeInfo.title) {
        if (employeeInfo.title.length < 1 || employeeInfo.title.length > 30) {
            browser.expect.element('(//div)[text()="The title field must be between 1 and 30 characters long. "]').to.be.visible            
       }    
    }
}    