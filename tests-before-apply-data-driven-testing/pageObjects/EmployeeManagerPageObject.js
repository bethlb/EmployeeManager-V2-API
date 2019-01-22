var employeeManagerCommands = {

    clickEmployee: function(employeeName) {
        this.api.useXpath()
        // console.log('employeeName = ', {employeeName})
        this.click(`//li[text()="${employeeName}"]`)
        this.api.useCss()
        return this
    },
     
    editEmployee: function(employeeInfo){
        if(employeeInfo.name){
            this
                .clearValue('@nameEntry')
                .setValue('@nameEntry', employeeInfo.name)
        }
        if(employeeInfo.phone){
            this
                .clearValue('@phoneEntry')
                .setValue('@phoneEntry', employeeInfo.phone)
        }
        if(employeeInfo.title){
            this
                .clearValue('@titleEntry')
                .setValue('@titleEntry', employeeInfo.title)
        }
        return this
    }
}

module.exports = {
    url : 'https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html',
    // url : 'http://localhost:3000',
    commands : [employeeManagerCommands],
    elements : {
        titleText : '.titleText',
        employee1 : '.listContainer > li:nth-child(1)',
        employee2 : '.listContainer > li:nth-child(2)',
        employee3 : '.listContainer > li:nth-child(3)',
        employee4 : '.listContainer > li:nth-child(4)',
        employee5 : '.listContainer > li:nth-child(5)',
        employee6 : '.listContainer > li:nth-child(6)',
        employee7 : '.listContainer > li:nth-child(7)',
        employee8 : '.listContainer > li:nth-child(8)',
        employee9 : '.listContainer > li:nth-child(9)',
        employee10 : 'li[name="employee10"]',   
        cardTitle : '#employeeTitle', 
        nameEntry : 'input[name="nameEntry"]',
        phoneEntry : 'input[name="phoneEntry"]',
        titleEntry : 'input[name="titleEntry"]',
        employeeID : '#employeeID',
        saveButton : '#saveBtn',
        cancelButton : '.neutralButton',
        addEmployeeButton : 'li[name="addEmployee"]',
        nameLabel : '.infoCard > div > span:nth-child(7)',
        phoneLabel : '.infoCard > div > span:nth-child(9)',
        titleLabel : '.infoCard > div > span:nth-child(11)', 
        idEntry : {
            selector : '(//input[4])',
            locateStrategy : 'xpath',
        },
        newEmployee : {
            selector : '(//li[@class="listText"][last()-1])',
            locateStrategy : 'xpath',
        },
        lastEmployee : {
            selector : '(//li[@class="listText"][last()-2])',
            locateStrategy : 'xpath',
        },
        noEmployeeSelected : '#noEmployee',
        errorMessage1 : {
            selector : '(//span[@class="errorMessage"]/div[1])',
            locateStrategy : 'xpath',
        },
        errorMessage2 : {
            selector : '(//span[@class="errorMessage"]/div[2])',
            locateStrategy : 'xpath',
        },
        errorMessage3 : {
            selector : '(//span[@class="errorMessage"]/div[3])',
            locateStrategy : 'xpath',
        },
        invalidInfo : 'input.materialInput.invalidInfo',
    }
}