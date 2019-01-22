var employeeManagerCommands = {

    clickEmployee: function (employeeName) {
        this.api.useXpath()
        this.click(`//li[text()="${employeeName}"]`)
        this.api.useCss()
        return this
    },

    clickLastEmployee: function () {
        this.api.useXpath()
        this.click(`//li[@class="listText"][last()-1]`)
        this.api.useCss()
        return this
    },

    editEmployee: function (employeeInfo) {
        if (employeeInfo.name) {
            this
                .clearValue('@nameEntry')
                .setValue('@nameEntry', employeeInfo.name)
        }
        if (employeeInfo.phone) {
            this
                .clearValue('@phoneEntry')
                .setValue('@phoneEntry', employeeInfo.phone)
        }
        if (employeeInfo.title) {
            this
                .clearValue('@titleEntry')
                .setValue('@titleEntry', employeeInfo.title)
        }
        return this
    },
    
    deleteNewEmployee: function () {
        this
            .clickLastEmployee()
            .getValue('@nameEntry', function (result) {
                if (result.value === "New Employee") {
                    this.click('button[name="delete"]')
                    .acceptAlert()
                    .pause(1000)
                }
            })
        return this
    },

    customClearValue: function (Page, selector) {
        Page
            .getValue(selector, function(result) {
                for (c in result.value) {
                    Page.setValue(selector, "\u0008")
                }
            })
    }
}

module.exports = {
    url: 'https://devmountain-qa.github.io/employee-manager-v2/build/index.html',
    commands: [employeeManagerCommands],
    elements: {
        titleText: '.titleText',
        employee1: '.listContainer > li:nth-child(2)',
        /*      employee2 : '.listContainer > li:nth-child(2)',
              employee3 : '.listContainer > li:nth-child(3)',
              employee4 : '.listContainer > li:nth-child(4)',
              employee5 : '.listContainer > li:nth-child(5)',
              employee6 : '.listContainer > li:nth-child(6)',
              employee7 : '.listContainer > li:nth-child(7)',
              employee8 : '.listContainer > li:nth-child(8)',
              employee9 : '.listContainer > li:nth-child(9)',
              employee10 : 'li[name="employee10"]', */
        cardTitle: '#employeeTitle',
        nameEntry: 'input[name="nameEntry"]',
        phoneEntry: 'input[name="phoneEntry"]',
        emailEntry: 'input[name="emailEntry"]',
        titleEntry: 'input[name="titleEntry"]',
        employeeID: '#employeeID',
        saveButton: 'button[name="save"]',
        cancelButton: 'button[name="cancel"]',
        deleteButton: 'button[name="delete"]',
        addEmployeeButton: 'li[name="addEmployee"]',
        searchInput: 'input[name="searchBox"]',
        clearButton: 'button[name="clearSearch"]',
        nameLabel: 'span[name="nameLabel"]',
        phoneLabel: 'span[name="phoneLabel"]',
        emailLabel: 'span[name="emailLabel"]',
        titleLabel: 'span[name="titleLabel"]',
        namePrompt: {
            selector: '(//span[@class="placeholderText"])[text()=" Name "]',
            locateStrategy: 'xpath',
        },
        phonePrompt: {
            selector: '(//span[@class="placeholderText"])[text()=" Phone Number "]',
            locateStrategy: 'xpath',
        },
        emailPrompt: {
            selector: '(//span[@class="placeholderText"])[text()=" Email Address "]',
            locateStrategy: 'xpath',
        },        
        titlePrompt: {
            selector: '(//span[@class="placeholderText"])[text()=" Title "]',
            locateStrategy: 'xpath',
        },
        lastEmployee: {
            selector: '(//li[@class="listText"][last()-1])',
            locateStrategy: 'xpath',
        },
        secondToLastEmployee: {
            selector: '(//li[@class="listText"][last()-2])',
            locateStrategy: 'xpath',
        },
        thirdToLastEmployee: {
            selector: '(//li[@class="listText"][last()-3])',
            locateStrategy: 'xpath',
        },
        fourthToLastEmployee: {
            selector: '(//li[@class="listText"][last()-4])',
            locateStrategy: 'xpath',
        },
        noEmployeeSelected: '#noEmployee',
        errorMessage1: {
            selector: '(//span[@class="errorMessage"]/div[1])',
            locateStrategy: 'xpath',
        },
        errorMessage2: {
            selector: '(//span[@class="errorMessage"]/div[2])',
            locateStrategy: 'xpath',
        },
        errorMessage3: {
            selector: '(//span[@class="errorMessage"]/div[3])',
            locateStrategy: 'xpath',
        },
        invalidInfo: 'input.materialInput.invalidInfo',
    }
}