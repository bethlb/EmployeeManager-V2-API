module.exports = {
    fieldPrompts: [
        {
            field: '@namePrompt',
            fieldPrompt: 'Name'
        },
        {
            field: '@phonePrompt',
            fieldPrompt: 'Phone Number'
        },
        {
            field: '@emailPrompt',
            fieldPrompt: 'Email Address'
        },        
        {
            field: '@titlePrompt',
            fieldPrompt: 'Title'
        } 
    ],
        initialFieldValues: [
        {
            field: '@nameEntry',
            fieldValue: 'New Employee'
        },
        {
            field: '@phoneEntry',
            fieldValue: '(111)111-1111'
        },
 /*       {
            field: '@emailEntry',
            fieldValue: ''
        }, */       
        {
            field: '@titleEntry',
            fieldValue: 'New Employee'
        }               
    ],
    invalidFieldValues: [
        {   // Invalid Phone - not 10 digits
            nameField: 'Tom Brady',
            phoneField: 'abc',
            emailField: '@gmail.com',
            titleField: 'Football Star',
            nameErrorElement: '(//div)[text()="The name field must be between 1 and 30 characters long. "]',
            phoneErrorElement: '(//div)[text()="The phone number must be 10 digits long. "]',
            emailErrorElement: '(//div)[text()="The email must be a valid 30 character email address. "]',
            titleErrorElement: '(//div)[text()="The title field must be between 1 and 30 characters long. "]'
        },
        {   // Invalid Phone - not 10 digits
            nameField: 'Tom Brady',
            phoneField: 'ABCDEFGHI',
            emailField: 'abc@gmail.com',
            titleField: 'Football Star',
            nameErrorElement: '(//div)[text()="The name field must be between 1 and 30 characters long. "]',
            phoneErrorElement: '(//div)[text()="The phone number must be 10 digits long. "]',
            emailErrorElement: '(//div)[text()="The email must be a valid 30 character email address. "]',
            titleErrorElement: '(//div)[text()="The title field must be between 1 and 30 characters long. "]'            
        },
        {   // Invalid Phone - not 10 digits
            nameField: 'Tom Brady',
            phoneField: '!@#$%&*()_',
            emailField: 'abc@gmail.com',
            titleField: 'Football Star',
            nameErrorElement: '(//div)[text()="The name field must be between 1 and 30 characters long. "]',
            phoneErrorElement: '(//div)[text()="The phone number must be 10 digits long. "]',
            emailErrorElement: '(//div)[text()="The email must be a valid 30 character email address. "]',
            titleErrorElement: '(//div)[text()="The title field must be between 1 and 30 characters long. "]'            
        },     
        {   // All fields invalid - Blank
            // nameField: ' \uE003',
            // phoneField: ' \uE003',
            // titleField: ' \uE003',
            nameField: '',
            phoneField: '',
            emailField: '',
            titleField: '',            
            nameErrorElement: '(//div)[text()="The name field must be between 1 and 30 characters long. "]',
            phoneErrorElement: '(//div)[text()="The phone number must be 10 digits long. "]',
            emailErrorElement: '(//div)[text()="The email must be a valid 30 character email address. "]',
            titleErrorElement: '(//div)[text()="The title field must be between 1 and 30 characters long. "]'            
        },     
        {   // All fields have invalid lengths
            nameField: 'abcdefghijabcdefghilabcdefghijk',
            phoneField: '12345678901',
            emailField: 'abcabcabcabcabcabcabcabc@gmail.com',
            titleField: 'abcdefghijabcdefghilabcdefghijk',
            nameErrorElement: '(//div)[text()="The name field must be between 1 and 30 characters long. "]',
            phoneErrorElement: '(//div)[text()="The phone number must be 10 digits long. "]',
            emailErrorElement: '(//div)[text()="The email must be a valid 30 character email address. "]',
            titleErrorElement: '(//div)[text()="The title field must be between 1 and 30 characters long. "]'            
        }     
    ],
    validFieldValues: [
        {
            nameField: 'Queen Elizabeth12$$',
            phoneField: '1234567890',
            emailField: 'abc-d@mail.com',
            titleField: 'Manager'
        },
        {
            nameField: 'Queen Elizabeth12$$',
            phoneField: '1234567890',
            emailField: 'abc@mail-archive.com',
            titleField: 'Manager-(Dept 1)'
        },
        {
            nameField: 'Q',
            phoneField: '3334445555',
            emailField: 'abc@mail.org',
            titleField: 'M'
        }  
    ],          
    searchData: [
        {
            nameField: 'Cooper Smith',
            phoneField: '0987654321',
            emailField: 'abcd@mail.com',
            titleField: 'Manager1'
        },
        {
            nameField: 'Brett Smith',
            phoneField: '0987654321',
            emailField: 'abc@mail-archive.com',
            titleField: 'Manager2'
        },
        {
            nameField: 'Cooper Jones',
            phoneField: '0987654321',
            emailField: 'abcd@mail.com',
            titleField: 'Manager3'
        },
        {
            nameField: 'Sean Smith',
            phoneField: '3334445555',
            emailField: 'abcd@mail.org',
            titleField: 'Owner'
        }    
    ],          
    searchInputAndResults: [
        {
            input: 'Cooper',
            results: ['Cooper Smith', 'Cooper Jones']
        },
        {
            input: 'Sean Smith',
            results: ['Sean Smith']
        },
        {
            input: '0987654321',
            results: ['Cooper Smith', 'Brett Smith', 'Cooper Jones']
        },
        {
            input: 'abcd@mail.com',
            results: ['Cooper Smith', 'Cooper Jones']
        },
        {
            input: 'Worker',
            results: ['Cooper Smith', 'Brett Smith', 'Cooper Jones']
        },
        {
            input: 'Owner',
            results: ['Sean Smith']
        },         
        {
            input: 'Alexa',
            results: []
        },                                                           
    ]
}