// Set all form values
module.exports = (Page, employee) => {
        Page.customClearValue(Page, '@nameEntry')
        Page.setValue('@nameEntry', employee.name)
        Page.customClearValue(Page, '@phoneEntry')
        Page.setValue('@phoneEntry', employee.phone)
        Page.customClearValue(Page, '@emailEntry')
        Page.setValue('@emailEntry', employee.email)
        Page.customClearValue(Page, '@titleEntry')
        Page.setValue('@titleEntry', employee.title)
}
